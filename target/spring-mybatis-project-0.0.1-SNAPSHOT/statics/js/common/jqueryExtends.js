(function($) {
	if ($) {
		$.extend($.fn.validatebox.defaults.rules, {
			// 验证最小长度
			minLength : {
				validator : function(value, param) {
					return value.length >= param[ 0 ];
				},
				message : '输入的数据的最小长度为{0}'
			},
			// 验证小数是否符合规则
			decimal : {
				validator : function(value, params) {
					var re = new RegExp('^(\\d{1,' + params[ 0 ] + '})(\\.\\d{1,' + params[ 1 ] + '})?$');
					if (params.length === 3) {
						this.message = '输入的数据的最小值为{2}，整数部分最大长度为{0}，小数部分最大长度为{1}';
						return re.test(value) && value > params[ 2 ];
					}
					this.message = '输入的数据的整数部分最大长度为{0}，小数部分最大长度为{1}';
					return re.test(value);
				}
			},
			// 验证 HTML 标签，过滤空格
			filterHtmlAndTab : {
				validator : function(value, params) {
					var filter = /<|>/g;
					if (value) {
						if (filter.test(value)) {
							this.message = '输入的数据有误，不能出现“<”、“>”等 HTML 特有字符。';
							return false;
						}
						$('input#' + params[ 0 ]).val($.trim(value).replace(/\s/g, ''));
					}
					return true;
				}
			},
			// 过滤多个空格为一个
			filterSpace : {
				validator : function(value, params) {
					$('input#' + params[ 0 ]).val($.trim(value).replace(/\s{1,}/g, ' '));
					return true;
				}
			},
			maxline : {
				validator : function(value,params){
					if(value.split('\n').length < params[0]){
						return true;
					}
					this.message = '为了避免查询效率过低而出现超时错误，请控制输入的编码个数在' + params[0] + ' 以内';
					return false;
				}
			}
		});

		$.extend({
			product : {
				doPostAjax : function(obj) {
					// 序列化数据，用于提交数组的值
					jQuery.ajaxSettings.traditional = true;
					$.post(obj.url, obj.date, function(result) {
						obj.callback(result);
					}, 'json');
				},
				bindingCategoryTree : function(tagId) {
					$('#' + tagId).combotree({
						data : [ {
							'id' : '-1',
							'text' : '产品类别',
							'state' : 'closed'
						} ],
						onShowPanel : function() {
							var rootNode = $("#" + tagId).combotree("tree").tree('getRoot');
							$("#" + tagId).combotree("tree").tree('expand', rootNode.target);
						},
						onBeforeExpand : function(node) {
							$("#" + tagId).combotree("tree").tree("options").url = base + "/categoryTree/fetchCategoryListByParentId.action?category.parentId=" + node.id;
						},
						onClick : function(node) {
							var rootCategory = node.id;
							if (rootCategory != -1) {
								$("#" + tagId).combotree('setValue', node.id);
							} else {
								$("#" + tagId).combotree('setValue', '');
							}
						}
					});
				},
				resetFrom : function(formId) {
					$('#' + formId).find(':input').each(function() {
						switch (this.type) {
							case 'checkbox':
							case 'radio':
								this.checked = false;
								break;
							case 'hidden' : // do nothing
								break;
							default:
								$(this).val('');
								break;
						}
					});
					$('.easyui-combobox').combobox('setValue', "0");
					$('.easyui-combotree').combotree('setValue', "");
				},
				openPostWindow : function(url, data) {
					var uuid = jQuery.now();
					// 创建 FORM
					var tempForm = document.createElement("form");
					tempForm.id = "TempForm" + uuid;
					tempForm.method = "post";
					tempForm.action = url;
					tempForm.target = tempForm.id;
					// 处理参数
					for (param in data) {
						if (undefined !== data[ param ]) {
							var hideInput = null;
							var dataObj = data[ param ];
							// 如果请求的参数是一个数组
							if (typeof dataObj === 'object') {
								for (val in dataObj) {
									hideInput = document.createElement("input");
									hideInput.type = "hidden";
									hideInput.name = param;
									hideInput.value = dataObj[ val ];
									tempForm.appendChild(hideInput);
								}
							} else {
								hideInput = document.createElement("input");
								hideInput.type = "hidden";
								hideInput.name = param;
								hideInput.value = data[ param ];
								tempForm.appendChild(hideInput);
							}
						}
					}
					// IE 浏览器事件绑定
					if (tempForm.attachEvent) {
						tempForm.attachEvent("onsubmit", function() {
							// window.open(uuid, new Date().getTime());
						});
					} else {
						// 非 IE 内核浏览器事件绑定
						tempForm.addEventListener("submit", function() {
							// window.open(uuid, new Date().getTime());
						}, false);
					}
					document.body.appendChild(tempForm);
					// 处理冒泡
					if (tempForm.fireEvent) {
						tempForm.fireEvent('onsubmit');
						tempForm.submit();
					} else if (document.create_rEvent) {
						var ev = document.create_rEvent('HTMLEvents');
						ev.initEvent('submit', false, true);
						tempForm.dispatchEvent(ev);
					}
					tempForm.submit();
					document.body.removeChild(tempForm);
					return false;
				}
			},
			imagex : {
				
			}
		});
		if (!String.trim) {
			String.prototype.trim = function() {
				return $.trim(this);
			};
		}
		/**
		 * 参考网友的代码实现的 format 功能，入参为时间的格式。
		 * 对Date的扩展，将 Date 转化为指定格式的String
		 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
		 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
		 * 例子：
		 * 		(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
		 * 		(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
		 * @param fmt
		 * 		eg. 'yyyy-MM-dd'....
		 * @returns
		 */
		Date.prototype.format = function(fmt) { 					// author: meizz
			var o = {
				"M+" : this.getMonth() + 1, 						// 月份
				"d+" : this.getDate(), 								// 日
				"h+" : this.getHours(), 							// 小时
				"m+" : this.getMinutes(), 							// 分
				"s+" : this.getSeconds(), 							// 秒
				"q+" : Math.floor((this.getMonth() + 3) / 3), 		// 季度
				"S" : this.getMilliseconds()						// 毫秒
			};
			if (/(y+)/.test(fmt)){
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for ( var k in o){
				if (new RegExp("(" + k + ")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr(("" + o[ k ]).length)));
				}
			}
			return fmt;
		};
		String.prototype.isEmpty = function() {
			return this.trim() === '';
		};
		String.prototype.isNotEmpty = function() {
			return !this.isEmpty();
		};
		String.prototype.isEmptyAndTrimValueEquals = function(str) {
			if (undefined === str || null === str) {
				return false;
			}
			if (this.isEmpty()) {
				return str.toString().isEmpty();
			} else if (str.isEmpty()) {
				return false;
			} else {
				return this.trim() === str.trim();
			}
		};
		String.prototype.isNotEmptyAndTrimValueEquals = function(str) {
			if (this.isEmpty() || undefined === str || null === str || str.isEmpty()) {
				return false;
			} else {
				return str.trim() === this.trim();
			}
		};
		// implement JSON.stringify serialization
		JSON.stringify = JSON.stringify || function(obj) {
			var t = typeof (obj);
			if (t != "object" || obj === null) {
				// simple data type
				if (t == "string")
					obj = '"' + obj + '"';
				return String(obj);
			} else {
				// recurse array or object
				var n = 0, v, json = [ ], arr = (obj && obj.constructor == Array);
				for (n in obj) {
					v = obj[ n ];
					t = typeof (v);
					if (t == "string")
						v = '"' + v + '"';
					else if (t == "object" && v !== null)
						v = JSON.stringify(v);
					json.push((arr ? "" : '"' + n + '":') + String(v));
				}
				return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
			}
		};
		$.product.right = [ ];
		// 销售类型
		$.product.saleTypeMap = [ ];
		$.product.saleTypeMap[ 1 ] = "备货";
		$.product.saleTypeMap[ 2 ] = "寄售";
		$.product.saleTypeMap[ 4 ] = "代售";
		$.product.saleTypeMap[ 5 ] = "聚单";
	} else {
		document.write('加载 jQuery 出错！jQuery 是 jPuery 库的依赖组件！');
	}
})(jQuery);

// 增加一个 console 的 expression
// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function() {
	};
	var methods = [ 'assert', 'clear', 'count', 'debug', 'error', 'info', 'log', 'warn' ];
	var length = methods.length;
	var console = (window.console = window.console || {});
	while (length--) {
		method = methods[ length ];
		// Only stub undefined methods.
		if (!console[ method ]) {
			console[ method ] = noop;
		}
	}
}());