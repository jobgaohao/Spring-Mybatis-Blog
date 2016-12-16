$(function() {
    searchBillStreamInfo();
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


function searchBillStreamInfo() {
	datagrid = $("#stream_search_table").datagrid({
    	url : base + '/billStream/getBillStreamList.action',
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
            field: 'effectiveTimeStr',
            title: '收票日期',
            width: "8%",
            align: 'center',
            sortable: true
        }, {
            field: 'operateDateStr',
            title: '操作日期',
            width: "8%",
            sortable: true,
            align: 'center'
        }, {
            field: 'status',
            title: '票据状态',
            width: "7%",
            sortable: true,
            align: 'center',
            formatter:function(value, data, index){
                var str= "";
                	if(value==10){
                		str = "待审核";
                	}else if (value==20){
                		str = "已驳回";
                	}else if (value==30){
                		str = "已入账";
                	}else if (value==40||value==50){
                		str = "已背书";
                	}else if (value==60){
                		str = "待托收";
                	}else if (value==70){
                		str = "待贴现";
                	}else if (value==80){
                		str = "已托收";
                	}else if (value==90){
                		str = "已贴现";
                	}else if (value==100){
                		str = "待收款";
                	}else if (value==200){
                		str = "已收款";
                	}
                return str;
    	 }
        }, {
            field: 'billCode',
            title: '票据号',
            width: "20%",
            sortable: true,
            align: 'left'
        }, {
            field: 'payDateStr',
            title: '出票日期',
            width: "8%",
            sortable: true,
            align: 'center'
        }, {
            field: 'maturityDateStr',
            title: '汇票到期日',
            width: "8%",
            sortable: true,
            align: 'center'
        }, {
            field: 'amount',
            title: '票面金额',
            width: "8%",
            sortable: true,
            align: 'right',
            formatter: function (value, row, index) {
                return $.longNumber.moneyToShortValue(value);
            }
        }, {
        	field: 'resourType',
        	title: '票据来源',
        	width: "6%",
        	sortable: true,
        	align: 'center',
        	formatter:function(value, data, index){
                 var str= "";
                 	if(value==10){
                 		str = "B2类型";
                 	}else if (value==20){
                 		str = "非B2类型";
                 	}
                 return str;
            }
        }, {
            field: 'paymentCompany',
            title: '付票单位',
            width: "18%",
            sortable: true,
            align: 'left'
        }, {
            field: 'toEndorsedCompany',
            title: '被背书单位',
            width: "18%",
            sortable: true,
            align: 'left'
        },  {
            field: 'remark',
            title: '备注',
            width: "10%",
            sortable: false,
            align: 'left'
        }]]
    });
    var pg = $('#stream_search_table').datagrid('getPager');
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
	var x_url = base + '/billStream/getBillStreamList.action';
	$('#stream_search_table').datagrid('options').url = x_url;
	//读取页面查询条件
	queryParam();
	console.log(param);
	$('#stream_search_table').datagrid('load',param);
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
	window.location.href= base + "/billStream/exportBillStreamList.action?billCode="+billCode
												+"&paymentCompany="+paymentCompany+"&toEndorsedCompany="+toEndorsedCompany
												+"&operateTypeCode="+operateTypeCode+"&operateDateBg="+operateDateBg
												+"&operateDateEd="+operateDateEd+"&amountBg="+amountBg+"&amountEd="+amountEd;
}