
var commonData = new Object();

/**
 * 绑定产品类别树型输入框
 * @param categoryId 绑定输入框ID
 */
commonData.bindCategoryTreeInput = function(categoryId,datagridId){
	var categoryIdInput = "#"+categoryId;
	$(categoryIdInput).tree({
		url:base +"/category/getMaterialTreeByCondition.action",
		queryParams:{MaterialTreeId:1,MaterialTreeType:-2,hasChild:true},
		onBeforeExpand:function(node){
			var id = node.id;
			var type = node.attributes.materialTreeType;
			var child = node.attributes.hasChild;
			$(categoryIdInput).tree("options").url = base+"/category/getMaterialTreeByCondition.action?MaterialTreeId="+id+"&MaterialTreeType="+type+"&hasChild="+child;
		},
		onLoadSuccess:function(node, data){
			//没有找到配置去除folder，只要用js去掉。如果去掉，要加遮罩
			//$('#sku_tree span').removeClass('tree-folder tree-file');
		},
		onClick:function(node){
			// 代表选中的一级类目
			if(node.attributes.materialTreeType == -1){
				var categoryId = node.id==-1?null:node.id;
				 $('#searchFlag').val(1);
				 $('#categoryId').val(categoryId);
				 $('#materialTreeId').val("");
				 $('#'+datagridId).datagrid({ queryParams: {'categoryId':categoryId,'valid':'T'} });
			}else{
				var materialTreeId = node.id==-1?null:node.id;
				 $('#searchFlag').val(1);
				 $('#materialTreeId').val(materialTreeId);
				 $('#categoryId').val("");
				 $('#'+datagridId).datagrid({ queryParams: {'materialTreeId':materialTreeId,'valid':'T'} });
			}
		}
	});
	
};

/**
 * 绑定下拉框，自动提示
 * divId:div框ID
 * inputId:获取绑定数据的 inputId
 * ulId: 下拉列表的ID
 * url ： 对应请求数据的 URL （返回对象，包含ID 及 名称）
 * setName : 请求数据的参数键
 * realValId 请求到的id值存放位置
 */
commonData.bulidAutoNameSelect = function(divId,inputId,ulId,url,setName, realValId){
	$('#'+inputId+'').keyup(function(e) {
		$('#'+divId+'').val('');
		$('#'+divId+' .drop_down_box').css({
			display : 'none'
		});
		var n = {
			temp : $.data(this, 'temp'),
			value : $(this).val()
		};
		if (n.value.toString().isEmpty()) {
			$('#'+divId+'').val('');
			$('#'+ulId+'').html('');//原来的搜索结果重置为空
			$.data(this, 'temp', '');
			return;
		}
		if (n.value.isNotEmptyAndTrimValueEquals(n.temp)) {
			return;
		}
		$.data(this, 'temp', n.value);
		var jsonObject =  new Object();
		jsonObject[setName] = n.value;
		$.product.doPostAjax({
			url : base + url,
			date :jsonObject,
			callback : function(e) {
				var node = {
					p : '<li><a tid='+divId+' tv="',
					s : '" href="javascript:void(0);">',
					x : '</a></li>',
					str : ''
				};
				if (e.length === 0) {
					e.push({
						id : ' ',
						name : '没有找到匹配的数据'
					});
				}
				$(e).each(function(i, o) {
					if (typeof(o) != "undefined") { 
						var pkId = "";
						if (typeof(o.id) == "undefined") { 
							if (typeof(o.pkid) == "undefined") { 
								return true;//跳出当前循环
							}else{
								pkId = o.pkid;
							}
						}else{
							pkId = o.id;
						}
						var pkName;
						if (typeof(o[setName]) == "undefined") { 
							pkName = "";
						}else{
							pkName = o[setName];
						}
						//id与name都为空视为未检索到内容，跳出当前循环
						if($.trim(pkId) == '' && $.trim(pkName) == ''){
							return true;
						}else{
							node.str += node.p + pkId + node.s + pkName + node.x;
						}
					}else{
						node.str = "<li><a href=\"javascript:void(0)\">未检索到相关内容</a></li>";
					}
				});
				if($.trim(node.str) == ''){
					node.str = "<li><a href=\"javascript:void(0)\">未检索到相关内容</a></li>";
				}
				$('#'+ulId+'').html(node.str);
				$('#'+divId+' .drop_down_box').css({
					display : 'block'
				});
				$('#'+ulId+' a[tid]').click(function(e) {
					if ($(this).attr('tv').isNotEmpty()) {
						$('#'+inputId+'').val($(this).text());
						$('#'+divId+'').val($(this).attr('tv'));
						if(typeof($('#'+realValId+'')) != "undefined"){
							var realVal = $(this).attr('tv');
							$('#'+realValId+'').val(realVal);
						}
					} else {
						$('#'+inputId+'').val('');
						$('#'+divId+'').val('');
						if(typeof($('#'+realValId+'')) != "undefined"){
							$('#'+realValId+'').val('');
						}
					}
					$('#'+divId+' .drop_down_box').css({
						display : 'none'
					});
				});
			}
		});
	});
}

/**
 *  导出全部数据时,弹出下载框
 *  datas:导出的条件信息
 *  url1: 需要先去查询符合条件的数据量
 *  url2：提交导出Controller ，分页导出
 */
commonData.bulidExportAllDialog = function(datas,url1,url2){
	$.messager.progress({
	    title: '导出全部',
	    msg: '请稍后...',
	    text: '正在加载数据.......'
	});
	$.ajax({
		url:base+url1,
		type:'post',
		dataType:'json',
		data:datas,
		success:function(res){
			$.messager.progress('close');
			if(!res){
				$.messager.alert('导出提示','查询数据出错');
				return;
			}
			if(res.total===0){
				$.messager.alert('导出提示','没有可以导出的数据');
				return;
			}
			var html='<div style="margin-top:30px;margin-left:20px"><input type="radio" id="excelWay" name="excelWay" value="1"/><strong>	快速导出Excel--共	<font color="red">'
						+res.total+'</font>	条数据,'
						+'每批最多导出<font color="red">1000</font>条,导出第	<input class="easyui-textbox" style="width:60px;" name="pageIndex" id="expPageIndex"/> / '
						+res.pageTotal+'	批'
						+'<div style="margin-top:20px;"><input type="radio" id="excelWay" name="excelWay" value="2"/>	自定义导出Excel--'
						+'<strong>当前	<input id="exportNum" class="easyui-numberspinner" data-options="min:1,max:1000" style="width:60px"/>	条记录</div>';
			$("#sku_showExpDiv").dialog({
				title: '导出所有',    
			    width: 600,    
			    height: 200,    
			    closable: true,    
			    cache: false,    
			    loadingMessage : '正在查询导出数据...',
			    content : html,
			    modal: true,
			    buttons:[{
					text:'开始导出',
					handler:function(){
						var way = $('input[name="excelWay"]:checked').val();
						var pageIndex = $.trim($("#expPageIndex").val());
						var rows = 1000;
						if(way == 1){
							if(!pageIndex || !$.isNumeric(pageIndex) || parseInt(pageIndex) <=0 || pageIndex==""){
								$.messager.alert('导出提示','请输入导出批次数字');
								return;
							}
							if(pageIndex > res.pageTotal){
								$.messager.alert('导出提示','必须小于等于总批次数');
								return;
							}
						}else if(way == 2){
							// 取自定义导出的条数
							var exportNum = $('#exportNum').numberspinner('getValue');
							if(!(1<=exportNum<=1000) || exportNum==""){
								$.messager.alert('导出提示','自定义导出条数须在1到1000之内');
								return;
							}else{
								//选择第二种导出方式时，默认导出第一页
								rows = exportNum;
								pageIndex = 1;
							}
						}else{
							$.messager.alert('导出提示','请选择导出方式');
							return;
						}
						var f = $("#sku_showExpForm");
						if(!f||f.length==0){
							f = $('<form id="sku_showExpForm" method="post" action="'+base+url2+'"></form>');
							f.appendTo($("body"));
						}
						f.empty();
						f.append('<input type="hidden" name="page" value="'+pageIndex+'"/>');
						f.append('<input type="hidden" name="rows" value="'+rows+'"/>');
						f.append('<input type="hidden" name="exportFlag" value="page"/>');
						var j = datas;
						for(var ele in j){
							f.append($('<input type="hidden" name="'+ele+'" value="'+j[ele]+'"/>'));
						}
						f.submit();
					}
				},{
					text:'退出',
					handler:function(){
						$('#sku_showExpDiv').dialog('close');
					}
				}]
			});
		},
		error:function(e){
			$.messager.progress('close');
			console.log(e);
		}
	});
}

/**
 * 类目定位专用!!!
 * 
 */
commonData.bulidAutoCategoryNameSelect = function(divId,inputId,ulId,url,setName, realValId){
	$('#'+inputId+'').keyup(function(e) {
		$('#'+divId+'').val('');
		$('#'+divId+' .drop_down_box').css({
			display : 'none'
		});
		var n = {
			temp : $.data(this, 'temp'),
			value : $(this).val()
		};
		if (n.value.toString().isEmpty()) {
			$('#'+divId+'').val('');
			$('#'+ulId+'').html('');//原来的搜索结果重置为空
			$.data(this, 'temp', '');
			return;
		}
		if (n.value.isNotEmptyAndTrimValueEquals(n.temp)) {
			return;
		}
		$.data(this, 'temp', n.value);
		var jsonObject =  new Object();
		jsonObject[setName] = n.value;
		$.product.doPostAjax({
			url : base + url,
			date :jsonObject,
			callback : function(e) {
				var node = {
					p : '<li><a tid='+divId+' tv="',
					s : '" href="javascript:void(0);">',
					x : '</a></li>',
					str : ''
				};
				if (e.length === 0) {
					e.push({
						id : ' ',
						name : '没有找到匹配的数据'
					});
				}
				$(e).each(function(i, o) {
					if (typeof(o) != "undefined") { 
						var pkId = "";
						if (typeof(o.id) == "undefined") { 
							if (typeof(o.pkid) == "undefined") { 
								return true;//跳出当前循环
							}else{
								pkId = o.pkid;
							}
						}else{
							pkId = o.id;
						}
						var pkName;
						if (typeof(o[setName]) == "undefined") { 
							pkName = "";
						}else{
							pkName = o[setName];
						}
						//id与name都为空视为未检索到内容，跳出当前循环
						if($.trim(pkId) == '' && $.trim(pkName) == ''){
							return true;
						}else{
							node.str += node.p + pkId + node.s + pkName + node.x;
						}
					}else{
						node.str = "<li><a href=\"javascript:void(0)\">未检索到相关内容</a></li>";
					}
				});
				if($.trim(node.str) == ''){
					node.str = "<li><a href=\"javascript:void(0)\">未检索到相关内容</a></li>";
				}
				$('#'+ulId+'').html(node.str);
				$('#'+divId+' .drop_down_box').css({
					display : 'block'
				});
				$('#'+ulId+' a[tid]').click(function(e) {
					if ($(this).attr('tv').isNotEmpty()) {
						$('#'+inputId+'').val($(this).text());
						$('#'+divId+'').val($(this).attr('tv'));
						if(typeof($('#'+realValId+'')) != "undefined"){
							var realVal = $(this).attr('tv');
							/**
							 * 定位类目
							 */
							locateCategory.locateCategory('productTree',realVal);
						}
					}
					$('#'+divId+' .drop_down_box').css({
						display : 'none'
					});
				});
			}
		});
	});
}

// 下拉框事件：上键 下键 回车键
function bindSelectKeyUpDownEnter($select,enterCallback){
	var selectArray = $select.combobox("getData");
	$select.parent().find("input").eq(0).keydown(function(e){
		var curval = $select.combobox('getValue'); // 当前下拉框的值
		switch (e.keyCode) {
			case 38: // 上键：点击上键的时候选择下拉框的下一条
				var to =0; // 目标选项下标
				for(var i=0;i<selectArray.length;i++){
					if(curval == $select.combobox("getData")[i].value){
						if(i!=(selectArray.length-1)){
							to=i+1;
						}
					}
				}
				$select.combobox("select",$select.combobox("getData")[to].value);
				break;
			case 40: // 下键：点击下键的时候选择下拉框的上一条
				var to =selectArray.length-1; // 目标选项下标
				for(var j=selectArray.length-1;j>=0;j--){
					if(curval == $select.combobox("getData")[j].value){
						if(j!=0){
							to=j-1;
						}
					}
				}
				$select.combobox("select",$select.combobox("getData")[to].value);
				break;
			case 13: // 回车键：调用查询方法
				enterCallback();
				break;
		}
	});
}

// 公共提示信息
var commonMsg = {
	sureStart:"确定要启用吗?",
	sureStop:"确定要停用吗?",
	startSuccess:"启用成功!",
	stopSuccess:"停用成功!",
	choseTooMore:"您选择了多条信息,请选择一条信息!",
	pleaseChoseOne:"请先选择一条信息!"
};

















