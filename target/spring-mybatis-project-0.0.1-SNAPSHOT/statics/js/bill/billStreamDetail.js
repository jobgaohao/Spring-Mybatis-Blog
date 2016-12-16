$(function() {
    searchBillStreamDetailInfo();
});


var param ={};
function queryParam(){
	var billCode = $("#billCode").val();
	var paymentCompany = $("#paymentCompany").val();
	var toEndorsedCompany = $("#toEndorsedCompany").val();
	var operateTypeCode = $("#operateTypeCode").combobox('getValue');
	var operateDateBg = $("#operateDateBg").datebox('getValue');
	var operateDateEd = $("#operateDateEd").datebox('getValue');
	var amountBg = $("#amountBg").val();
	var amountEd = $("#amountEd").val();
	 param = {
			'billCode':billCode,
			'paymentCompany':paymentCompany,
			'toEndorsedCompany':toEndorsedCompany,
			'operateTypeCode':operateTypeCode,
			'operateDateBg':operateDateBg,
			'operateDateEd':operateDateEd,
			'amountBg':amountBg,
			'amountEd':amountEd
	};
}

/***
 * **************************校验查询参数是否为空*************************************
 * */
function chkParam(){
	var operateDateBg = $("#operateDateBg").datebox('getValue');
	var operateDateEd = $("#operateDateEd").datebox('getValue');
	var amountBg = $("#amountBg").val();
	var amountEd = $("#amountEd").val();
	if(operateDateBg!='' && operateDateEd!='' ){
		if(operateDateBg>operateDateEd){
			return false;
		}
	}
	if(amountBg!='' && amountEd!='' ){
		if(amountBg>amountEd){
			return false;
		}
	}
		return true;
}

/**
 * *****************清空查询条件*******************
 * */
function clearQuery() {
	$("#billCode").textbox('setValue','');
	$("#paymentCompany").textbox('setValue','');
	$("#toEndorsedCompany").textbox('setValue','');
	$("#operateTypeCode").combobox('setValue',"");
	$("#operateDateBg").datebox("setValue", "");
	$("#operateDateEd").datebox("setValue", "");
	$("#amountBg").textbox('setValue','');
	$("#amountEd").textbox('setValue','');
}

function searchBillStreamDetailInfo() {
	datagrid = $("#streamDetail_search_table").datagrid({
    	url : base + '/billStream/getBillStreamDetailList.action',
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
            field: 'operateType',
            title: '操作类型',
            width: "7%",
            align: 'center',
            sortable: false
        }, {
            field: 'operateDateStr',
            title: '操作日期',
            width: "8%",
            sortable: false,
            align: 'center'
        }, {
            field: 'billCode',
            title: '票据号',
            width: "20%",
            sortable: false,
            align: 'left'
        }, {
            field: 'payDateStr',
            title: '出票日期',
            width: "8%",
            sortable: false,
            align: 'center'
        }, {
            field: 'maturityDateStr',
            title: '汇票到期日',
            width: "8%",
            sortable: false,
            align: 'center'
        }, {
            field: 'amount',
            title: '票面金额',
            width: "8%",
            sortable: false,
            align: 'right',
            formatter: function (value, row, index) {
                return $.longNumber.moneyToShortValue(value);
            }
        }, {
        	field: 'resourType',
        	title: '票据来源',
        	width: "6%",
        	sortable: false,
        	align: 'center',
        	 formatter:function(value, data, index){
                 var str= "";
                 	if(value==10){
                 		str = "客户";
                 	}else if (value==20){
                 		str = "票据公司";
                 	}
                 return str;
             }
        }, {
            field: 'paymentCompany',
            title: '付票单位',
            width: "18%",
            sortable: false,
            align: 'left'
        }, {
            field: 'toEndorsedCompany',
            title: '被背书单位',
            width: "18%",
            sortable: false,
            align: 'left'
        }, {
            field: 'changeAmount',
            title: '抵用金额',
            width: "8%",
            sortable: false,
            align: 'right',
            formatter: function (value, row, index) {
                return $.longNumber.moneyToShortValue(value);
            }
        }, {
            field: 'rechargeDateStr',
            title: '充值日期',
            width: "8%",
            sortable: false,
            align: 'center'
        }]]
    });
    var pg = $('#streamDetail_search_table').datagrid('getPager');
	$(pg).pagination({
		total : 0,
		pageList : [ 10, 20, 50, 100 ],// 可以设置每页记录条数的列表
		beforePageText : '第',// 页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录'
	});
}

function query(){
	if(!chkParam()){
		$.messager.alert('提示信息', '查询条件输入有误', 'info');
		return;
	}
	var x_url = base + '/billStream/getBillStreamDetailList.action';
	$('#streamDetail_search_table').datagrid('options').url = x_url;
	//读取页面查询条件
	queryParam();
	$('#streamDetail_search_table').datagrid('load',param);
}

//导出
function exportExcel(){
	var billCode = $("#billCode").val();
	var paymentCompany = $("#paymentCompany").val();
	var toEndorsedCompany = $("#toEndorsedCompany").val();
	var operateTypeCode = $("#operateTypeCode").combobox('getValue');
	var operateDateBg = $("#operateDateBg").datebox('getValue');
	var operateDateEd = $("#operateDateEd").datebox('getValue');
	var amountBg = $("#amountBg").val();
	var amountEd = $("#amountEd").val();
	window.location.href= base + "/billStream/exportBillStreamDetailList.action?billCode="+billCode
												+"&paymentCompany="+paymentCompany+"&toEndorsedCompany="+toEndorsedCompany
												+"&operateTypeCode="+operateTypeCode+"&operateDateBg="+operateDateBg
												+"&operateDateEd="+operateDateEd+"&amountBg="+amountBg+"&amountEd="+amountEd;
}