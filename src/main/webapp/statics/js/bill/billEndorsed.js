$(function() {
    searchBillInfo();
});


function cleanQuery(){
	$("#addedTimeBg").datebox("setValue", "");
	$("#addedTimeEd").datebox("setValue", "");
    $("#payTimeBg").datebox('setText',"");
    $("#payTimeEd").datebox('setValue',"");
    $("#requestCode").textbox('setValue',"");
    $("#paymentCode").textbox('setValue',"");
    $("#billCode").textbox('setValue',"");
    $("#customerId").textbox('setValue',"");
    $("#status").combobox('setValue',"");
    
}
  //全局变量定义查询参数
    var param ={};
    
    /***
     * *******************************查询参数赋值*****************************************
     * */
    function queryParam(sort,order){
    	var billCode = $("#billCode").val();
    	var addedTimeBg = $("#addedTimeBg").datebox('getValue');
    	var addedTimeEd = $("#addedTimeEd").datebox('getValue');
    	var payTimeBg = $("#payTimeBg").datebox('getValue');
    	var payTimeEd = $("#payTimeEd").datebox('getValue');
    	var requestCode = $("#requestCode").val();
    	var customerId = $("#customerId").val();
    	var status = $("#status").combobox('getValue');
    	 param = {
    			 'billCode':billCode,
    			'addedTimeBg':addedTimeBg,
    			'addedTimeEd':addedTimeEd,
    			'payTimeBg':payTimeBg,
    			'payTimeEd':payTimeEd,
    			'requestCode':requestCode,
    			'customerId':customerId,
    			'status':status,
    			'sort':sort,
    			'order':order
    	};
    }

    /***
     * **************************校验查询参数是否为空*************************************
     * */
    function chkParam(){
    	var addedTimeBg = $("#addedTimeBg").datebox('getValue');
    	var addedTimeEd = $("#addedTimeEd").datebox('getValue');
    	var payTimeBg = $("#payTimeBg").datebox('getValue');
    	var payTimeEd = $("#payTimeEd").datebox('getValue');
    	if(addedTimeBg!='' && addedTimeEd!='' ){
    		if(addedTimeBg>addedTimeEd){
    			return false;
    		}
    	}
    	if(payTimeBg!='' && payTimeEd!='' ){
    		if(payTimeBg>payTimeEd){
    			return false;
    		}
    	}
    		return true;
    }
    
function searchBillInfo() {
	datagrid = $("#basic_search_table").datagrid({
    	url : base + '/billEndorsed/getBillEndorsedList.action',
		method : 'post',
		collapsible : true,
        nowrap : false,
        striped : true,
        fitColumns : false,
        rownumbers : true,
        singleSelect : false,
        selectOnCheck: true,
        checkOnSelect: true,
        remoteSort : false,
        pagination : true,
        showFooter : true,//页脚
        fit:true,
		pageSize : 20,
		pageList : [ 10, 20, 50 ],
        columns: [[{
            field: 'operater', title: '操作', width: 160, align: 'center',
            formatter: function (value, row, index) {
                var endored = "<a  name='edit' href='javascript:void(0);' disabled='true' onclick=\"endored('"+row.pkid+"','"+row.serialNumber+"','"+row.billCode+"')\">背书</a><span>&nbsp;&nbsp;</span>";
                if(row.btnClickEndr=='0'){
                	endored = "<span >背书&nbsp;&nbsp;</span>";
                }
                var refuse = "<a  name='edit' href='javascript:void(0);' onclick=\"refuse('"+row.pkid+"','"+row.serialNumber+"','"+row.billCode+"')\">驳回金融</a><span>&nbsp;&nbsp;</span>";
                if(row.btnClickInte=='0'){
                	refuse = "<span >驳回金融&nbsp;&nbsp;</span>";
                }
                //var refundback = "<a  name='edit' href='javascript:void(0);' onclick=\"refundback('"+row.pkid+"')\">驳回采购</a><span>&nbsp;&nbsp;</span>";
               // if(row.btnClickpur=='0'){
                //	refundback = "<span >驳回采购&nbsp;&nbsp;</span>";
               // }
                var refundback="";
//                var refundconf = "<a  name='edit' href='javascript:void(0);' onclick=\"refundconf('"+row.pkid+"')\">退票确认</a><span>&nbsp;&nbsp;</span>";
//                if(row.btnClickReject=='0'){
//                	refundconf = "<span >退票确认&nbsp;&nbsp;</span>";
//                }
                var refundconf="";
                return endored+' '+refuse+' '+refundback+' '+refundconf;
            }
        },{title: '', field: 'tcPkid', width: 50, checkbox: true, align: "center"},  {
            field: 'addedTimeStr',
            title: '申请日期',
            width: 80,
            align: 'center',
            sortable: true
        }, {
            field: 'requestCode',
            title: '申请单号',
            width: 120,
            sortable: false,
            align: 'center'
        }, {
            field: 'status',
            title: '状态',
            width: 50,
            sortable: false,
            align: 'center',
            formatter:function(value, data, index){
                var str= "";
                	if(value==10){
                		str = "待背书";
                	}else if (value==30 || value ==301){
                		str = "已驳回";
                	}else if (value==60 || value==601){
                		str = "已退票";
                	}else if (value==70){
                		str = "待收票确认";
                	}else if (value==80){
                		str = "已确认";
                	}else if (value==100){
                		str = "待分配";
                	}
                return str;
            }
        }, {
            field: 'applicationType',
            title: '单据类型',
            width: 80,
            sortable: false,
            align: 'center',
            formatter:function(value, data, index){
                var str= "";
                	if(value==10){
                		str = "付款申请";
                	}else if (value==20){
                		str = "认账申请";
                	}else if (value==30){
                		str = "B1补款";
                	}else if (value==40){
                		str = "B1退款";
                	}else if (value==50){
                		str = "B1收款余额退款";
                	}
                return str;
            }
        }, {
            field: 'systemSource',
            title: '单据来源',
            width: 80,
            sortable: false,
            align: 'center'
        }, {
            field: 'amount',
            title: '票面金额',
            width: 80,
            sortable: true,
            align: 'right',
            formatter: function (value, row, index) {
                return $.longNumber.moneyToShortValue(value);
            }
        }, {
        	field: 'billCode',
        	title: '票据号',
        	width: 210,
        	sortable: false,
        	align: 'left',
        		 formatter: function (value, row, index) {
        			 if (row.billCode==null && row.serialNumber==null) return "";
                     return row.billCode+row.serialNumber;
                 }
        }, {
            field: 'realAmount',
            title: '可抵用金额',
            width: 80,
            sortable: true,
            align: 'right',
            formatter: function (value, row, index) {
                return $.longNumber.moneyToShortValue(value);
            }
        }, {
            field: 'customerName',
            title: '对方公司',
            width: 200,
            sortable: false,
            align: 'left'
        }, {
            field: 'applicationTraderName',
            title: '申请人',
            width: 60,
            sortable: false,
            align: 'left'
        }, {
            field: 'applicationDeptName',
            title: '申请部门',
            width: 120,
            sortable: false,
            align: 'left'
        }, {
            field: 'paymentName',
            title: '支付类型',
            width: 90,
            sortable: false,
            align: 'left'
        }, {
            field: 'modifyname',
            title: '操作人',
            width: 80,
            sortable: false,
            align: 'left'
        }, {
            field: 'payTimeStr',
            title: '背书日期',
            width: 80,
            sortable: true,
            align: 'center'
        }, {
            field: 'remark',
            title: '备注',
            width: 130,
            sortable: false,
            align: 'left'
        }]],
        onLoadSuccess:onLoadSuccess,
  		onSelect:function(){
  			footerupdate();
  		},
  		onUnselect:function(){
  			footerupdate();
  		},
  		onSortColumn:function (sort,order){
  			query(sort,order);
  		 },
   		onSelectAll:function(){
  			footerupdate();
  		},
  		onUnselectAll:function(){
  			footerupdate();
  		}
    });
    var pg = $('#basic_search_table').datagrid('getPager');
	$(pg).pagination({
		total : 0,
		pageList : [ 10, 20, 50, 100 ],// 可以设置每页记录条数的列表
		beforePageText : '第',// 页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录'
	});
}

function onLoadSuccess(data){
	$('#basic_search_table').datagrid('reloadFooter',[{realAmount:compute('realAmount'),amount:compute('amount')},
	                                                  {realAmount:0,amount:0}]);
	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="operater"]').html(showContent("合计："));
  	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="operater"]').html(showContent("勾选合计："));
  	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="tcPkid"]').html(showSelectNum(data.rows.length));
   	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="tcPkid"]').html(showSelectNum(0));
}

function footerupdate(){
	var data=$('#basic_search_table').datagrid('getData');
    var realAmountSelect=0;
	var amountSelect=0;
    var rows = $('#basic_search_table').datagrid('getSelections');
    	for(var i = 0;i<rows.length;i++){
    		realAmountSelect+=rows[i].realAmount;
    		amountSelect+=rows[i].amount;
    }
    	$('#basic_search_table').datagrid('reloadFooter',[{realAmount:compute('realAmount'),amount:compute('amount')},
    	                                                  {realAmount:realAmountSelect,amount:amountSelect}]);
    	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="operater"]').html(showContent("合计："));
    	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="operater"]').html(showContent("勾选合计："));
    	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="tcPkid"]').html(showSelectNum(data.rows.length));
     	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="tcPkid"]').html(showSelectNum(rows.length));
}

function showContent(content){
	return '<div style="text-align:center;white-space:normal;height:auto;" class="datagrid-cell datagrid-cell-c2-operater">'+content+'</div>';
}

function showSelectNum(num){
	return '<div style="" class="datagrid-cell-check">'+num+'</div>';
}


function compute(colName) {
    var rows = $('#basic_search_table').datagrid('getRows');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
    	if(rows[i][colName] == null){
    		rows[i][colName] = 0;
    	}
        total += parseFloat(rows[i][colName]);
    }
    return total;
}

function query(sort,order){
	if(!chkParam()){
		$.messager.alert('提示信息', '查询条件输入有误', 'info');
		return;
	}
	var x_url = base + '/billEndorsed/getBillEndorsedList.action';
	$('#basic_search_table').datagrid('options').url = x_url;
	//读取页面查询条件
	queryParam(sort,order);
	$('#basic_search_table').datagrid('load',param);
}

//批量背书
function batchEndored(){
	
	$.messager.confirm("操作提示", "您确定要执行 批量背书  操作吗？", function (data) {  
        if (data) {  
        	var checkedItems = $('#basic_search_table').datagrid('getChecked');
        	var pkids = "";
        	var chkNum = 0;
        	$.each(checkedItems, function(index, item){
        		pkids += item.tcPkid + ";";
        		chkNum +=1;
        	}); 
        	//未勾选数据提示
        	if (chkNum == 0 ) {
        		$.messager.alert('提示信息', '请选择数据!', 'info');
        		return;
        	}
        	var param = {
        			'pkids':pkids
        		};
        	var x_url = base + '/billEndorsed/batchEndorsedBill.action';
        	 $.ajax({
        	 	url:x_url,
        	 	type: 'POST',
        	 	data:param,
        	 	dataType: 'JSON',
        	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
        	 		if(textStatus=='error'){
        	 			$.messager.alert('提示信息', '状态错误，背书失败，请刷新重新背书！', 'info');
        	 		}
        	     },
        	 	success: function(data){
        	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
        	 	}
        	 });   
        }         
    });  	
}

/*
* 背书
*/
function endored(pkid,serialNumber,billCode){
	$.messager.confirm("操作提示", "您确定要执行  背书  操作吗？", function (data) {  
        if (data) {  
        	 if(pkid != null && pkid != ''){
        	    	var param = {
        	    			'pkid':pkid,
        	    			'serialNumber':serialNumber,
        	    			'billCode':billCode
        	    		};
        	    	var x_url = base + '/billEndorsed/endorsedBill.action';
        	    	 $.ajax({
        	    	 	url:x_url,
        	    	 	type: 'POST',
        	    	 	data:param,
        	    	 	dataType: 'JSON',
        	    	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
        	    	 		if(textStatus=='error'){
                	 			$.messager.alert('提示信息', '状态错误，背书失败，请刷新重新背书！', 'info');
                	 		}
        	    	     },
        	    	 	success: function(data){
        	    	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
        	    	 	}
        	    	 });
        	    }
        }          
    });  
}

/*
 * =========================驳回采购=======================
 */
function refundback(pkid){
	 $.messager.confirm("操作提示", "您确定要执行  驳回采购  操作吗？", function (data) {
         if (data) {
        	 if(pkid != null && pkid != ''){
     	    	var param = {
     	    			'pkid':pkid
     	    		};
     	    	var x_url = base + '/billEndorsed/refusePurchaseBill.action';
     	    	 $.ajax({
     	    	 	url:x_url,
     	    	 	type: 'POST',
     	    	 	data:param,
     	    	 	dataType: 'JSON',
     	    	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
     	    			$.messager.alert('提示信息', textStatus, '系统错误，请联系维护人员！');
     	    	     },
     	    	 	success: function(data){
     	    	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
     	    	 	}
     	    	 });
     	    }
         }         
     });			
}

/*
 * 驳回金融
 */
function refuse(pkid,serialNumber,billCode){	 
    $.messager.confirm("操作提示", "您确定要执行 驳回金融 操作吗？", function (data) {
        if (data) {
        	if(pkid != null && pkid != ''){
    		  	var param = {
    	    			'pkid':pkid,
    	    			'serialNumber':serialNumber,
    	    			'billCode':billCode
    	    		};
    	    	var x_url = base + '/billEndorsed/refuseBill.action';
    	    	 $.ajax({
    	    	 	url:x_url,
    	    	 	type: 'POST',
    	    	 	data:param,
    	    	 	dataType: 'JSON',
    	    	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
    	    			$.messager.alert('提示信息', textStatus, '系统错误，请联系维护人员！');
    	    	     },
    	    	 	success: function(data){
    	    	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
    	    	 	}
    	    	 });
    	    }
        }        
    });
}

/*
 * 退票确认
 */
function refundconf(pkid,serialNumber,billCode){
	$.messager.confirm("操作提示", "您确定要执行  退票确认  操作吗？", function (data) {
        if (data) {
        	if(pkid != null && pkid != ''){
            	var param = {
            			'pkid':pkid,
            			'serialNumber':serialNumber,
            			'billCode':billCode
            		};
            	var x_url = base + '/billEndorsed/refundconf.action';
            	 $.ajax({
            	 	url:x_url,
            	 	type: 'POST',
            	 	data:param,
            	 	dataType: 'JSON',
            	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
            			$.messager.alert('提示信息', textStatus, '系统错误，请联系维护人员！');
            	     },
            	 	success: function(data){
            	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
            	 	}
            	 });
            }
        }        
    });	
}

function exportExcel(){
	var billCode = $("#billCode").val();
	var addedTimeBg = $("#addedTimeBg").datebox('getValue');
	var addedTimeEd = $("#addedTimeEd").datebox('getValue');
	var payTimeBg = $("#payTimeBg").datebox('getValue');
	var payTimeEd = $("#payTimeEd").datebox('getValue');
	var requestCode = $("#requestCode").val();
	var customerId = $("#customerId").val();
	var status = $("#status").combobox('getValue');
	window.location.href= base + "/billEndorsed/exportBillEndorsedList.action?billCode="+billCode
												+"&addedTimeBg="+addedTimeBg+"&addedTimeEd="+addedTimeEd
												+"&payTimeBg="+payTimeBg+"&payTimeEd="+payTimeEd
												+"&requestCode="+requestCode+"&customerId="+customerId+"&status="+status;
}



