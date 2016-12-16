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
function chkParam(){
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

function setDate(){
	var myDate = new Date();	
	myDate.setDate(myDate.getDate());//获取今天日期
	var str_date= myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
	$("#addDateBegin").datebox('setValue',str_date);
	$("#addDateEnd").datebox('setValue',str_date);
}


/**
 * 装载Grid
 */
function searchPaymentDetailInfo() {	
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
function query(){

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
function exportExcel(){
	var addDateBegin = $("#addDateBegin").datebox('getValue');
	var addDateEnd = $("#addDateEnd").datebox('getValue');
	window.location.href= base + "/blog/exportBlog.action?paymentDateBegin="+paymentDateBegin+"&paymentDateEnd="+paymentDateEnd;
}

/**
 * 抓取数据
 */
function grabData(){
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
