$(function(){
	bindTrimInput(); // 绑定事件：失去焦点或者点击回车时去掉input框的前后空格

	
	/**
	 * datebox前后时间验证
	 */
	$.extend($.fn.validatebox.defaults.rules,{  
	    dateValid : {  
	        validator : function(value,param) { //参数value为当前文本框的值，也就是endDate  
	            startTime = $(param[0]).datetimebox('getValue');//获取起始时间的值  
	            var start = $.fn.datebox.defaults.parser(startTime);  
	            var end = $.fn.datebox.defaults.parser(value);  
	            varify = end >= start;  
	            return varify;  
	        },  
	        message : '结束时间要大于开始时间!'  
	    }  
	});
	
	/**
	 * datebox前后时间验证
	 */
	$.extend($.fn.validatebox.defaults.rules,{  
	    dateValidBg : {  
	        validator : function(value,param) { //参数value为当前文本框的值，也就是endDate  
	            endTime = $(param[0]).datetimebox('getValue');//获取起始时间的值  
	            var start = $.fn.datebox.defaults.parser(value);  
	            var end = $.fn.datebox.defaults.parser(endTime);  
	            varify = end >= start;  
	            return varify;  
	        },  
	        message : '开始时间要小于结束时间!'  
	    }  
	});
	
	/**
	 * datagrid 序号自适应
	 * 在onLoadSuccess方法中调用
	 * 调用方法 : $(this).datagrid("fixRownumber");
	 * @author leilei.gao
	 */
	$.extend($.fn.datagrid.methods, {
		fixRownumber : function (jq) {
			return jq.each(function () {
				var panel = $(this).datagrid("getPanel");
				//获取最后一行的number容器,并拷贝一份
				var clone = $(".datagrid-cell-rownumber", panel).last().clone();
				//由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
				clone.css({
					"position" : "absolute",
					left : -1000
				}).appendTo("body");
				var width = clone.width("auto").width();
				//默认宽度是25,所以只有大于25的时候才进行fix
				if (width > 25) {
					//多加5个像素,保持一点边距
					$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
					//修改了宽度之后,需要对容器进行重新计算,所以调用resize
					$(this).datagrid("resize");
					//一些清理工作
					clone.remove();
					clone = null;
				} else {
					//还原成默认状态
					$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
				}
			});
		}
	});
	
	/**
	 * 修改单元格数据方法重写
	 */
	$.extend($.fn.datagrid.methods, {
		editCell: function(jq,param){
			return jq.each(function(){
				var opts = $(this).datagrid('options');
				var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
				for(var i=0; i<fields.length; i++){
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor1 = col.editor;
					if (fields[i] != param.field){
						col.editor = null;
					}
				}
				$(this).datagrid('beginEdit', param.index);
				for(var i=0; i<fields.length; i++){
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor = col.editor1;
				}
			});
		}
	});
});

// 去掉input框的前后空格
function bindTrimInput(){
	// 对应class为easyui-textbox的EasyUI input
	$(".trim_easyuiinput").each(function(){
		var _this=$(this);
		var $showInput=_this.next().find(".textbox-text"); // 显示在页面的input框
		$showInput.blur(function(){ // 失去焦点时
			var oldValue = _this.textbox('getValue').trim();
			_this.textbox('setValue',oldValue);
		}).keydown(function(event){ // 点击回车时
			var e = event ? event :(window.event ? window.event : null);
			if(e.keyCode==13){
				var oldValue = _this.textbox('getValue').trim();
				_this.textbox('setValue',oldValue);
			}
		});
	});
	// 对应原始html input
	$(".trim_input").each(function(){
		var _this=$(this);
		_this.blur(function(){ // 失去焦点时
			var oldValue = _this.val().trim();
			_this.val(oldValue);
		}).keydown(function(event){ // 点击回车时
			var e = event ? event :(window.event ? window.event : null);
			if(e.keyCode==13){ // 点击回车时
				var oldValue = _this.val().trim();
				_this.val(oldValue);
			}
		});
	});
}

/**
 * 将表单数据转为json
 * @param id from表单id
 * @param addParam 还需额外添加的参数（json格式）
 */
function form2Json(id, addParam) {
	var arr = $("#" + id).serializeArray()
	var jsonStr = "";
	jsonStr += '{';
	if(typeof(addParam) != 'undefined' && addParam != ''){
		jsonStr += addParam;
	}
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].value.trim()!=null && arr[i].value.trim()!=''){
			jsonStr += '"' + arr[i].name + '":"' + arr[i].value.trim() + '",';
		}
	}
	if (jsonStr.length > 1) {
		jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
	}
	jsonStr += '}';
	var json = JSON.parse(jsonStr);
	return json;
}

/**
 * 自动将对象属性值填充到对应的dom元素中（input,select）
 * dom元素命名规则为 "前缀"+"对象属性名"
 * 
 * @param param 需要设置到页面的对象
 * @param formName from表单id
 * @param prefix 需要填充dom元素的前缀
 */
function setFormItemValue(param,formName,prefix)
{
	if(param && (typeof(param)=="object" || param instanceof Object))
	{
		 var form = formName||0;
		 //获得表单所有元素
		 var formEle = document.forms[form] == undefined ? document.getElementById(form) : document.forms[form];
		 var eles= formEle == null?undefined:formEle.elements;
		 
		 var ele = null;
		 
		 var idName = null;
		 
		 //元素class名称
		 var classNames = null;
		 
		 var val = null;
		 
		 for(var i=0;i<eles.length;i++){
			 
			//按钮元素
			ele = eles[i];

			classNames = ele.className;
			//遇到按钮不处理
			if(ele.type=="button" || ele.type=="submit" || ele.type=="reset") continue;
			
			//获得ID或者Name
			idName=ele.name?ele.name:ele.id;
			
			if(idName){
				
				if(prefix){
					//去掉前缀
					idName = idName.replace(prefix,"");
				}
				
				try
				{
					val = param[idName];
					
					if(val != null) {
						//对于下拉列表的处理
						if(ele.type=="select-one"){

							var ops = ele.options;
							
							for(var j=0;j<ops.length;j++)
							{
								
								if(ops[j].value==val || ops[j].text==val) 
								{
									//选中相应的下拉项
									if(classNames != "" && classNames.indexOf("easyui-combobox") >= 0){
										$(ele).combobox('setValue', val);
									}else{
										ops[j].selected=true;
									}
								}
							}
						}else if(ele.type == "radio"){
							
							if(ele.value  == val){

								ele.checked = true;
							}
						}
						else if(classNames != "" && classNames.indexOf("easyui-textbox") >= 0)//普通字段的处理
						{
							$(ele).textbox('setValue', val);
						
						}else if(classNames != "" && classNames.indexOf("easyui-numberbox") >= 0){
							
							$(ele).numberbox('setValue',val);
							
						}else{
							ele.value = val;
						}
					}
					
				}catch(e)
				{
					ele.value = "";
				}
				
			}
			
		 }
	}
}

/**
 * @param formName from表单id
 * @param prefix 需要封装到对象的dom元素前缀
 * @returns 
 */
function setObjProteryByForm(formName,prefix)
{
	 var form = formName||0;
	 //获得表单所有元素
	 var formEle = document.forms[form] == undefined ? document.getElementById(form) : document.forms[form];
	 var eles= formEle == null?undefined:formEle.elements;
	
	 if(eles != undefined && eles.length > 0){
		 
		 var ele = null;
		 
		 var idName = null;
		 
		 //元素class名称
		 var classNames = null;
		 
		//属性名称	 
		 var prepName = null;
		 
		 var param = new Object();
			 
		 var val = null;
		 
		 try{
			 //遍历元素	 
			 for(var i=0;i<eles.length;i++){
				 
				//按钮元素
				ele = eles[i];

				//获得ID或者Name
				idName=ele.name?ele.name:ele.id;
				
				classNames = ele.className;
				
				//去掉id前缀，获取相应属性名
				prepName = idName.replace(prefix,"");
				
				if(prepName != null && prepName != "" && prepName != undefined){
					
					//遇到按钮不处理
					if(ele.type=="button" || ele.type=="submit" || ele.type=="reset") continue;
					
					//对于下拉列表的处理
					if(ele.type=="select-one"){
			
						//下拉选为easyui-combobox
						if(classNames != "" && classNames.indexOf("easyui-combobox") >= 0){
							param[prepName] = $(ele).combobox('getValue');
						}else{
							param[prepName] = $(ele).val();
						}
					}else if(ele.type == "radio"){
						
						if(ele.checked == true){
							param[prepName] = ele.value;
						}
					}
					else if(classNames != "" && classNames.indexOf("easyui-textbox") >= 0){
						
						//去掉获取内容的前后空格
						param[prepName] = $("input",$($(ele).next("span"))).val().replace(/(^\s*)|(\s*$)/g, "");
						
					}else if(classNames != "" && classNames.indexOf("easyui-numberbox") >= 0){
						
						//去掉获取内容的前后空格
						param[prepName] = $("input",$($(ele).next("span"))).val().replace(/(^\s*)|(\s*$)/g, "");
						
					}else{//普通字段的处理
						
						//去掉获取内容的前后空格
						param[prepName] = ele.value.replace(/(^\s*)|(\s*$)/g, "");
					}
				}
			}
		 }catch(e)
			 	{
				 	ele.value = "";
				}
		 
		 return param;
	 }		
	
	 return null;
}

function cleanFormItem(formName,prefix){
	
	 var form = formName||0;
	 //获得表单所有元素
	 var formEle = document.forms[form] == undefined ? document.getElementById(form) : document.forms[form];
	 var eles= formEle == null?undefined:formEle.elements;
	
	 if(eles != undefined && eles.length > 0){
		 
		 var ele = null;
		 
		 var idName = null;
		 
		 //元素class名称
		 var classNames = null;
		 
		 try{
			 //遍历元素	 
			 for(var i=0;i<eles.length;i++){
				 
				//按钮元素
				ele = eles[i];
				
				//获得ID或者Name
				idName=ele.id?ele.id:ele.name;
				
				classNames = ele.className;
				
				if(idName.indexOf(prefix) >= 0){
					
					//遇到按钮不处理
					if(ele.type=="button" || ele.type=="submit" || ele.type=="reset") continue;
					
					//对于下拉列表的处理
					if(ele.type=="select-one"){
						
						//清空下拉选
						if(classNames != "" && classNames.indexOf("easyui-combobox") >= 0){
							
							$(ele).combobox('setValue','');
							
						}else{
							
							var ops = ele.options;
							ops[0].selected=true;
							
						}
					}else if(ele.type == "radio"){
						
						ele.checked = false;
					}
					else if(classNames != "" && classNames.indexOf("easyui-textbox") >= 0)
					{
						$(ele).textbox('setValue','');
						
					}else if(classNames != "" && classNames.indexOf("easyui-numberbox") >= 0){
						
						$(ele).numberbox('setValue','');
						
					}else{//普通字段的处理
						ele.value = "";
					}
				}
				
			}
		 }catch(e)
			 	{
				 	ele.value = "";
				}
		 
	 }		
	
}

/**
 * 设置页面元素禁用/取消禁用
 * @param formId 表单id
 * @param prefix 表单元素id 前缀/后缀
 * @param isDisabled 是否禁用
 */
function changeDomStat(formId,prefix,isDisabled){
	
	
	 var form = formId||0;
	 //获得表单所有元素
	 var formEle = document.forms[form] == undefined ? document.getElementById(form) : document.forms[form];
	 var eles= formEle == null?undefined:formEle.elements;
	
	 if(eles != undefined && eles.length > 0){
		 
		 var ele = null;
		 var idName = null;
		 //元素class名称
		 var classNames = null;
		 
		 try{
			 //遍历元素	 
			 for(var i=0;i<eles.length;i++){
				 
				//按钮元素
				ele = eles[i];
				
				//获得ID或者Name
				idName=ele.name?ele.name:ele.id;
				
				classNames = ele.className;
				
				if(idName.indexOf(prefix) >= 0){
					
					//遇到按钮不处理
					if(ele.type=="button" || ele.type=="submit" || ele.type=="reset") continue;
					
					//对于下拉列表的处理
					if(ele.type=="select-one"){
						//清空下拉选
						if(classNames != "" && classNames.indexOf("easyui-combobox") >= 0){
							$(ele).combobox({ disabled: isDisabled });
						}else{
							
							//设置和移除下拉选disabled属性
							$(ele).attr("disabled",isDisabled);
						}
					}else if(ele.type == "radio"){
						
						//设置radio禁用
						$(ele).attr("disabled",isDisabled);
					}
					else if(classNames != "" && classNames.indexOf("easyui-textbox") >= 0)//普通字段的处理
					{
						$(ele).textbox({ disabled: isDisabled });
						
					}else if(classNames != "" && classNames.indexOf("easyui-numberbox") >= 0){
						
						$(ele).numberbox({ disabled: isDisabled });
						
					}else{
						//设置文本框disabled
						$(ele).attr("disabled",isDisabled);
					}
				}
				
			}
		 }catch(e)
			 	{
				 	ele.value = "";
				}
		 
	 }
	
}

// 判定字符串长度，一个汉字是2个字符
String.prototype.glen = function() {
	var len = 0;
	for (var i=0; i<this.length; i++) {
		if((/[\u4e00-\u9fa5]+/).test(this[i])){ // 是汉字
			len += 2;
		}else{ // 非汉字
			len ++;
		}
	}
	return len;
};

/**
 * 查询框历史记录
 * cookie实现，依赖jquery.cookie.js
 * keys:每个输入框用不同的key，定义到keys里，调用时传入数组下标，从0开始
 * 保存到历史：history(1,"找钢")，查询历史：history(1)
 * @type {{keys: string[], history: Function}}
 *
 * 例子：
 * 1.easyui input
 * 	   <td class="history_show_hide_marker">
 * 	   <input id="search_abbreviation" name="abbreviation" class="easyui-textbox trim_easyuiinput" type="text" style="width: 150px;">
 * 	   <div class="history_drop_box">
 * 	   <div class="ul_box"></div>
 * 	   </div>
 * 	   </td>
 * 	   html里，输入框和历史box的共同父类要加上class“history_show_hide_marker”，用来标示点击document时是否进行隐藏，见searchHistory.bindDocumentClick
 * 	   jquery初始化方法加入显示历史方法 例如  searchHistory.show4EasyuiInput($("#search_abbreviation"),0);
 * 	   查询方法加入 写入历史方法 例如：searchHistory.history(0,$("#search_abbreviation").textbox('getValue'));
 */
var searchHistory = {
	keys:["cookiekey1","cookiekey2","cookiekey3","cookiekey4","cookiekey5"],
	historyChanged:[true,true,true,true,true],
	// 保存 or 获取 cookie中的历史信息
	history:function(keyIndex,value){
		var key = searchHistory.keys[keyIndex];
		if (typeof value != 'undefined' && value.trim() != "") { // value given, set history
			value = value.trim();
			var redisVal = searchHistory.redisGet(key); // redis 存储json格式
			var album =  JSON.parse(redisVal); // 转为js数组
			if(!album || album == null || album == ""){
				album = new Array();
			}

			// copy到新数组
			var newAlbum = new Array();
			for(var int = 0; int < album.length; int++){
				if(value != album[int]){
					newAlbum.push(album[int])
				}
			}
			newAlbum.push(value);

			if(newAlbum.length > 5){ // 超过5条，则删除最后一条
				newAlbum.shift();
			}
			searchHistory.redisSet(key,JSON.stringify(newAlbum));
			searchHistory.historyChanged[keyIndex] = true; // 标记历史记录有改变
		}
		else{ // 获取
			var redisVal = searchHistory.redisGet(key); // redis 存储json格式
			searchHistory.historyChanged[keyIndex] = false; // 清楚历史记录改变状态
			var album =  JSON.parse(redisVal); // 转为js数组
			if(!album || album == null || album == ""){
				album = new Array();
			}
			return album;
		}
	},
	redisSet : function(key,value){
		$.ajax({
			url : base + "/redis/setUserSearchHistroyByKey.action",
			type : 'post',
			async : true,
			dataType : 'json',
			data : {key:key,value:value},
			success : function(res){
			}
		});
	},
	redisGet : function(key){
		var returnVal;
		$.ajax({
			url : base + "/redis/getUserSearchHistroyByKey.action",
			type : 'post',
			async : false,
			dataType : 'json',
			data : {key:key},
			success : function(res){
				if(res.success){
					returnVal  = res.message;
				}
			}
		});
		return returnVal;
	},
	// 拼接历史信息 ul html
	getUlHtml:function(keyIndex){
		var html = '';
		var album = searchHistory.history(keyIndex);
		if(album && album.length > 0){
			html += '<ul>';
			for(var int = album.length - 1; int >= 0; int--){
				html += '<li>' + album[int] + '</li>';
			}
			html += '</ul>';
		}
		return html;
	},
	// 隐藏历史信息展示框
	hideBox : function (){
		$(".history_drop_box").hide();
	},
	// 显示easyui input的历史信息框
	showHistoryBox4EasyuiInput : function($obj,keyIndex){
		var box = $obj.nextAll(".history_drop_box");
		if(searchHistory.historyChanged[keyIndex]){ // 如果记录有改变，则重新获取，否则直接显示
			var html = searchHistory.getUlHtml(keyIndex);
			box.find(".ul_box").html(html);
			box.find("li").each(function(){
				var li_val = $(this).text();
				$(this).click(function(){
					$obj.textbox('setValue',li_val);
					searchHistory.hideBox();
				});
			});
		}
		box.show();
	},
	// 显示原生input的历史信息框
	showHistoryBox4Input : function($obj,keyIndex){
		var box = $obj.nextAll(".history_drop_box");
		if(searchHistory.historyChanged[keyIndex]) { // 如果记录有改变，则重新获取，否则直接显示
			var html = searchHistory.getUlHtml(keyIndex);
			box.find(".ul_box").html(html);
			box.find("li").each(function () {
				var li_val = $(this).text();
				$(this).click(function () {
					$obj.val(li_val);
					searchHistory.hideBox();
				});
			});
		}
		box.show();
	},
	// 显示easyuiinput历史入口
	show4EasyuiInput:function($obj,keyIndex){// easyui input
		if($obj.hasClass("easyui-textbox")){
			$obj.next().find(".textbox-text").focus(function(){
				if($(this).val() == ""){
					searchHistory.showHistoryBox4EasyuiInput($obj,keyIndex);
				}
			});
			$obj.next().find(".textbox-text").keyup(function(){
				if($(this).val() == ""){
					searchHistory.showHistoryBox4EasyuiInput($obj,keyIndex);
				}else{
					searchHistory.hideBox();
				}
			});
			searchHistory.bindDocumentClick();
		}
	},
	// 显示input历史入口
	show4Input:function($obj,keyIndex){// 原始input
		$obj.focus(function(){
			if($(this).val() == ""){
				searchHistory.showHistoryBox4Input($obj,keyIndex);
			}
		});
		$obj.keyup(function(){
			if($(this).val() == ""){
				searchHistory.showHistoryBox4Input($obj,keyIndex);
			}else{
				searchHistory.hideBox();
			}
		});
		searchHistory.bindDocumentClick();
	},
	// 全局点击事件，主要用来隐藏弹出框
	bindDocumentClick : function(){
		$(document).click(function(event){
			var e = event ? event :(window.event ? window.event : null);
			var $target = $(e.target);
			if(!$target.parents().hasClass("history_show_hide_marker")){
				searchHistory.hideBox();
			}
		});
	}
};

/**
 * @param value 单元格值
 * @param keyListStr 关键字字符串
 * @param splitChar 关键字字符串连接符
 * @returns
 */
function setKeyHighLight(value,keyListStr,splitChar){
	
	var dataList = keyListStr.split(splitChar);
	var keyStr = value;
	for(var i = 0; i < dataList.length; i++){
	  var key = dataList[i];
	  if(key != null && key != ""){
		  if (value.indexOf(key) > -1) {
			  keyStr = keyStr.split(key).join("<span style='color:red;background-color:yellow'>" + key + "</span>");
		  }
	  }
  }
	return keyStr;
}

/**
 * 根据入参获取关键字字符串
 * @param url 获取关键字请求路径
 * @param param 请求参数
 * @param hiddenId 保存关键字字符串hidden的id
 */
function getKeyWords(url,param,hiddenId){
	$.post(
		 url,
		 param,
		 function(data){
			 if(data != null){
				  $("#"+hiddenId).val(data);
			 }
		 }
	);
}
