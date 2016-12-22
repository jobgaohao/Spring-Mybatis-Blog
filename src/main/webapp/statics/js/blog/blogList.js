$(function() {	
	setDate();
	
	searchPaymentDetailInfo();
	
	$("#payment_btn_serach").bind("click",function(){
		query();
	});
	
	$("#payment_btn_export").bind("click",function(){
		exportExcel();
	});
	
	$("#payment_btn_grab").bind("click",function(){
		grabData();
	});
	
	$("#btn_Add_cancle").bind("click",function(){
		closeDialog();		
	});
	
	$("#btn_Add_save").bind("click",function(){
		doEditBlog();		
	});
	
	$("#loginOut").bind("click",function(){
		loginOut();
	});
});


var param ={};
function queryParam(){
	var addDateBegin = $("#addDateBegin").datebox('getValue');
	var addDateEnd = $("#addDateEnd").datebox('getValue');
	var blogText=$("#blogText").val();
	 param = {
			'addDateBegin':addDateBegin,
			'addDateEnd':addDateEnd,
			'blogText':blogText
	};
}

/***
 * **************************校验查询参数是否为空*************************************
 * */
var chkParam=function(){
	var addDateBegin = $("#addDateBegin").datebox('getValue');
	var addDateEnd = $("#addDateEnd").datebox('getValue');
	if(addDateBegin=="" ){
		$.messager.alert('提示信息', '请输入查询时间', 'info');
	  return false;	
	}	
	else if(addDateEnd=="" ){
		$.messager.alert('提示信息', '请输入查询时间', 'info');
		return false;	
	}	
	return true;
}

var setDate=function(){
	var myDate = new Date();	
	myDate.setDate(myDate.getDate());//获取今天日期
	var str_date= myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
	$("#addDateBegin").datebox('setValue',str_date);
	$("#addDateEnd").datebox('setValue',str_date);
}

/**
 * 删除博客
 */
var delBlog=function(pkid){
	var param = {
			'pkid':pkid
	};
	$.messager.confirm("操作提示", "你确认要删除这篇博客吗？", function (data) {
		if(data){
			MaskUtil.mask();
			$.ajax({
			 	url:base + "/blog/delBlog.action",
			 	type: 'POST',
			 	data:param,
			 	dataType: 'JSON',	 
			 	success: function(data){
			 		if(data.result=="1"){
						$.messager.alert('提示信息', '删除成功!', 'info');				
						MaskUtil.unmask();
						query();
					}
			 	}
			 });   
		}
	});
}

/**
 * 编辑博客-查询
 */
var editBlog=function(pkid){
	var param = {
			'pkid':pkid
	};
	MaskUtil.mask();
	$("#editBlog").dialog("open");
	//查询绑定值	
	$.ajax({
	 	url:base + "/blog/getBlog.action",
	 	type: 'POST',
	 	data:param,
	 	dataType: 'JSON',	 
	 	success: function(data){
	 		if(data.pkid!=0){
	 			$("#hidden_pkid").val(data.pkid);
				$("#inputBlogText").textbox("setValue",data.blogText);	
				$("#inputBlogHref").textbox("setValue",data.blogHref);	
				$("#inputBlogContent").textbox("setValue",data.blogContent);
				$("#inputBlogSummary").textbox("setValue",data.blogSummary);
				$("#inputRemark").textbox("setValue",data.remark);
				MaskUtil.unmask();
			}
	 	}
	 });   
}

/**
 * 编辑博客功能 
 */
var doEditBlog=function(){
	
	var blogText=$("#inputBlogText").textbox("getValue");
	var blogHref=$("#inputBlogHref").textbox("getValue");
	if($.trim(blogText)=="" ){
		$.messager.alert('提示信息', '请输入博客标题', 'info');
	  return false;	
	}	
	else if($.trim(blogHref)=="" ){
		$.messager.alert('提示信息', '请输入博客链接', 'info');
		return false;	
	}	
	
	var param = {
			'pkid':$("#hidden_pkid").val(),
			'blogText':blogText,	
			'blogHref':blogHref,	
			'blogContent':$("#inputBlogContent").textbox("getValue"),
            'blogSummary':$("#inputBlogSummary").textbox("getValue"),
			'remark':$("#inputRemark").textbox("getValue")
	};
	//查询绑定值
	MaskUtil.mask();
	$.ajax({
	 	url:base + "/blog/modifyBlog.action",
	 	type: 'POST',
	 	data:param,
	 	dataType: 'JSON',	 
	 	success: function(data){
	 		if(data.result=="1"){
				$.messager.alert('提示信息', '修改成功!', 'info');				
				MaskUtil.unmask();
				query();
				closeDialog();	
			}
	 		else{
	 			$.messager.alert('提示信息', '修改失败!', 'info');				
				MaskUtil.unmask();
	 		}
	 	}
	 });   
	
	
	var file=$("#fileUploda");
    if($.trim(file.val())==''){           
           return false;
     }

	
    $.ajaxFileUpload({
    	type:"get",
    	url:base + "/blog/doUpload.action",			
		secureuri:true,
		enctype:'multipart/form-data',//注意一定要有该参数  
		dataType: 'json',
        fileElementId:'fileUploda',  
		success: function(data){
	 		if(data.result=="1"){
				$.messager.alert('提示信息', '上传成功!', 'info');				
				MaskUtil.unmask();
				query();
				closeDialog();	
			}
	 		else{
	 			$.messager.alert('提示信息', '上传失败!', 'info');				
				MaskUtil.unmask();
	 		}
	 	},
	 	error: function(e) { 
	 		console.log("modify error",e);
	 		$.messager.alert('提示信息', '上传失败!', 'info');				
			MaskUtil.unmask();
	 	} 
    });
}


/**
 * 关闭博客
 */
var closeDialog=function(){
	$("#editBlog").dialog("close");
}

/**
 * 装载Grid
 */
var searchPaymentDetailInfo=function() {	
	queryParam();
	$('#payment_search_table').datagrid('load',param);	
	datagrid = $("#payment_search_table").datagrid({
    	url : base + '/blog/getBlogsList.action',
		method : 'post',
		collapsible : true,
        nowrap : false,
        striped : true,
        fitColumns : false,
        rownumbers : true,
        singleSelect : true,
        selectOnCheck: true,
        checkOnSelect: true,
        remoteSort : false,
        pagination : true,
        fit:true,
		pageSize : 20,
		pageList : [ 10, 20, 50 ],
        columns: [[ 
           {
        	   title:"操作",
        	   field:"pkid",
        	   width:"120px",
        	   align:"center",
        	   formatter:function(value,data,index){
        		   var linkDel="<a name='edit' href='javascript:void(0)' onClick='editBlog("+value+")'>编辑</a>";
        		   var linkModify="<a name='del' href='javascript:void(0)' onClick='delBlog("+value+")'>删除</a>";
        		   return linkDel+" "+linkModify;
        	   }
           },      
           {
            field: 'blogText',
            title: '博客标题',
            align: 'left'
        }, {
            field: 'blogHref',
            title: '博客链接',
            align: 'left',
            formatter: function (value, row, index) {
           	 return "<a href='"+value+"' target='_Blank'>"+value+"</a>";
           }
        }, {
            field: 'valid',
            title: '是否有效',           
            align: 'left',
            
        }, 
        {
            field: 'addedTime',
            title: '添加时间',
            align: 'left',
            width:"140px",
            formatter: function (value, row, index) {
            	 return $.timeStamp.timeStampToDateString(value);
            }
        }
        ,{
            field: 'remark',
            title: '备注',
            align: 'left'
        }
        ]]
    });
    var pg = $('#payment_search_table').datagrid('getPager');
	$(pg).pagination({
		total : 0,
		pageList : [ 10, 20, 50, 100 ],// 可以设置每页记录条数的列表
		beforePageText : '第',// 页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录'
	});

}

/**
 * 查询
 */
var query=function(){

	if(!chkParam()){		
		return;
	}
	var x_url = base + '/blog/getBlogsList.action';
	$('#payment_search_table').datagrid('options').url = x_url;
	//读取页面查询条件
	queryParam();
	console.log("test",param);
	$('#payment_search_table').datagrid('load',param);
}

/**
 * 导出Excel
 */
var exportExcel=function(){
	var addDateBegin = $("#addDateBegin").datebox('getValue');
	var addDateEnd = $("#addDateEnd").datebox('getValue');
	var blogText=$("#blogText").val();
	window.location.href= base + "/blog/exportBlog.action?addDateBegin="+addDateBegin+"&addDateEnd="+addDateEnd+"&blogText="+blogText;
}

/**
 * 抓取数据
 */
var grabData=function(){
	MaskUtil.mask();
	$.ajax({
	 	url:base + "/blog/grabBlog.action",
	 	type: 'POST',
	 	data:param,
	 	dataType: 'JSON',	 
	 	success: function(data){
	 		if(data.result=="1"){
				$.messager.alert('提示信息', '抓取成功!', 'info');				
				MaskUtil.unmask();
				query();
			}
	 	}
	 });   
}


/**
 * 退出
 */
var loginOut=function(){
	window.location.href=base+"/login/logout.action";			
}
