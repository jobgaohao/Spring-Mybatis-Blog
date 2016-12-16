$(function(){ 
    //初始化列表2
	initBasicSearch(20);
	
	
	
	//输入框绑定回车事件
//	bandEnterEvent($("#categoryName"));
	
});
 
/**
 * *****************输入框绑定事件*******************
 * */
function bandEnterEvent(control){
	control.textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
        	querySpotZhongbanAndMerchantList();
        }
    });
}

/**
 * *****************价格不能为空checkbox点击查询数据*******************
 * */
function chk(){
	querySpotZhongbanAndMerchantList();
}

/**
 * *****************时间格式化*******************
 * */
formatterDate = function(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
};


/***
 * **************************列表2初始化***********************************
 * */
function initBasicSearch(pageSize){
	datagrid = $("#basic_search_table").datagrid({
		url : '',
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
		pageSize : pageSize,
		pageList : [ 10, 20, 50 ],
		columns :  [ [  
		              {title:'操作',field:'pkid',width:"22%",sortable:false,align:"center",
	                        formatter:function(value, data, index){
	                            var link= "";
	                            if(data.btnAuditStatus=="0"){
	                            	 link+="<span>审核</span>&nbsp;&nbsp;";
	                            }else{
	                            	 link+="<a name='edit' href=\"javascript:void(0)\" onclick=\"audit(event, '" + data.pkid + "','"+ data.billCode + "','"+data.serialNumber +"')\">审核</a>&nbsp;&nbsp;";
	                            }
	                            if(data.btnRejectStatus=="0"){
	                            	 link+="<span>驳回</span>&nbsp;&nbsp;";
	                            }else{
	                            	link+="<a name='edit' href=\"javascript:void(0)\" onclick=\"reject(event, '" + data.pkid + "','"+ data.billCode + "','"+data.serialNumber + "' )\">驳回</a>&nbsp;&nbsp;";
	                            }
	                            if(data.btnConfirmStatus=="0"){
	                            	link+="<span >退票确认&nbsp;&nbsp;</span>";
	                            }else{
	                            	link+="<a  name='edit' href='javascript:void(0);' onclick=\"refundconf('"+ data.pkid + "','"+ data.billCode + "','"+data.serialNumber + "')\">退票确认</a><span>&nbsp;&nbsp;</span>";
	                            }
	                            if(data.btnCollectionStatus=="0"){
	                            	link+="<span >托收&nbsp;&nbsp;</span>";
	                            }else{
	                            	link+="<a name='edit' href=\"javascript:void(0)\" onclick=\"collect('" + data.pkid + "','"+ data.billCode + "','"+data.serialNumber + "' )\">托收</a>&nbsp;&nbsp;";
	                            }
	                            if(data.btnDicountStatus=="0"){
	                            	link+="<span >贴现&nbsp;&nbsp;</span>";
	                            }else{
	                            	link+="<a name='edit' href=\"javascript:void(0)\" onclick=\"discount('" + data.pkid + "','"+ data.billCode + "','"+data.serialNumber + "' )\">贴现</a>&nbsp;&nbsp;";
	                            }
	                            if(data.btnBackStatus=="0"){
	                            	link+="<span >打回&nbsp;</span>";
	                            }else{
	                            	link+="<a name='edit' href=\"javascript:void(0)\" onclick=\"back('" + data.pkid + "','"+ data.billCode + "','"+data.serialNumber + "' )\">打回</a>&nbsp;";
	                            }
	                            return link;
	                        }
	                    },
	                    {
						    field: 'ck', 
						    title: "",
						    width: "4%",
						    align: "center",
						    checkbox: true
	                    }, 
		              {field : 'status',title : '状态',width : "5%",align : 'center', sortable : false,
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
	                   },
		              {field : 'billCodeCon',title : '票据号',width : "15%",align : 'left', sortable : false },  
		              {field : 'rechargeAmount',title : '充值金额',width : "6%" , align : 'right', sortable : true ,
		            	  formatter: function (value, row, index) {
		                        return $.longNumber.moneyToShortValue(value);
		                    }  
		              },
		              {field : 'amount',name:'AMOUNT',title : '票面金额',width : "8%" , align : 'right', sortable : true ,
		            	  formatter: function (value, row, index) {
		                        return $.longNumber.moneyToShortValue(value);
		                    }    
		              },
		              {field : 'paybillone',title : '对方公司',width : "15%" , align : 'left', sortable : false},
		              {field : 'revbillone',title : '本方公司',width : "15%" , align : 'left', sortable : false},
		              {field : 'businessDateStr',title : '业务日期',width : "8%", align : 'center', sortable : true },
		              {field : 'payDateStr',title : '出票日期',width : "8%" , align : 'center', sortable : true},
		              {field : 'maturityDateStr',title : '汇票到期日',width : "8%" , align : 'center', sortable : true} ,
		              {field : 'resourType',title : '来源',width : "6%" , align : 'center', sortable : false,
		            	  formatter:function(value, data, index){
	                            var str= "";
	                            	if(value==10){
	                            		str = "B2类型";
	                            	}else if (value==20){
	                            		str = "非B2类型";
	                            	}
	                            return str;
	                        }} ,
		              {field : 'collectionBankName',title : '银行',width : "8%" , align : 'center', sortable : false } 
	                 ]],
		              rowStyler:function(index,row){
		      			if (row.status==30){
		      				var resultDay = daysBetween(row.maturityDateStr);
		      				if(resultDay <=7 && resultDay >=0){
		      					return 'color:red;font-weight:bold;';
		      				}
		      			}
		      		},
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
	$('#basic_search_table').datagrid('reloadFooter',[{rechargeAmount:compute('rechargeAmount'),amount:compute('amount')},
	                                                  {rechargeAmount:0,amount:0}]);
	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="pkid"]').html(showContent("合计："));
	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="pkid"]').html(showContent("勾选合计："));
	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="ck"]').html(showSelectNum(data.rows.length));
	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="ck"]').html(showSelectNum(0));
}

function footerupdate(){
		var data=$('#basic_search_table').datagrid('getData');
	    var rechargeAmountSelect=0;
		var amountSelect=0;
	    var rows = $('#basic_search_table').datagrid('getSelections');
	    	for(var i = 0;i<rows.length;i++){
	    		rechargeAmountSelect+=rows[i].rechargeAmount;
	    		amountSelect+=rows[i].amount;
	    }
	    	$('#basic_search_table').datagrid('reloadFooter',[{rechargeAmount:compute('rechargeAmount'),amount:compute('amount')},
	  	                                                  {rechargeAmount:rechargeAmountSelect,amount:amountSelect}]);
	    	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="pkid"]').html(showContent("合计："));
	    	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="pkid"]').html(showContent("勾选合计："));
	    	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+0+"']").find('td[field="ck"]').html(showSelectNum(data.rows.length));
	     	$('div[class="datagrid-footer-inner"]').find("tr[datagrid-row-index='"+1+"']").find('td[field="ck"]').html(showSelectNum(rows.length));
}

function showContent(content){
	return '<div style="text-align:center;white-space:normal;height:auto;" class="datagrid-cell datagrid-cell-c2-pkid">'+content+'</div>';
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

function daysBetween(maturityDateStr)  
{   
    var OneMonth = maturityDateStr.substring(5,maturityDateStr.lastIndexOf ('-'));  
    var OneDay = maturityDateStr.substring(maturityDateStr.length,maturityDateStr.lastIndexOf ('-')+1);  
    var OneYear = maturityDateStr.substring(0,maturityDateStr.indexOf ('-'));  
  
    var nowDate = new Date();
    nowDate = nowDate.toLocaleDateString();
    var TwoMonth = nowDate.substring(5,nowDate.lastIndexOf ('/'));  
    var TwoDay = nowDate.substring(nowDate.length,nowDate.lastIndexOf ('/')+1);  
    var TwoYear = nowDate.substring(0,nowDate.indexOf ('/'));  
    var result=((Date.parse(OneMonth+'-'+OneDay+'-'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return result;
}  

/**
 * *****************清空查询条件*******************
 * */
function clearQuery() {
	$("#billId").textbox('setValue','');
	$("#billCode").textbox('setValue','');
	$("#payBillOne").textbox('setValue','');
	$("#effectiveTimeBg").datebox("setValue", "");
	$("#effectiveTimeEd").datebox("setValue", "");
	$("#amountBg").textbox('setValue','');
	$("#amountEd").textbox('setValue','');
	$("#revBillOne").textbox('setValue','');
	$("#status").combobox('setValue','0');
}

function audit(event,pkid,billCode1,billCode2){
	var x_url = base + '/bill/auditBill.action';
	var param = {
			"pkid":pkid,
			"billCode":billCode1,
			"serialNumber":billCode2
	};

	  $.messager.confirm("操作提示", "您确定要审核通过吗？",function (data) {
          if (data) {
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
          else {
          	return;
          }
      });
}

function reject(event,pkid,billCode1,billCode2){
	var x_url = base + '/bill/rejectBill.action';
	var param = {
			"pkid" : pkid,
			"billCode" : billCode1,
			"serialNumber" : billCode2
	};
	  $.messager.confirm("操作提示", "您确定要驳回吗？",function (data) {
          if (data) {
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
          else {
          	return;
          }
      });
}

//全局变量定义查询参数
var param ={};

/***
 * *******************************查询参数赋值*****************************************
 * */
function queryParam(sort,order){
	var billId = $("#billId").val();
	var billCode = $("#billCode").val();
	var paybillone = $("#payBillOne").val();
	var revBillOne = $("#revBillOne").val();
	var effectiveTimeBg = $("#effectiveTimeBg").datebox('getValue');
	var effectiveTimeEd = $("#effectiveTimeEd").datebox('getValue');
	var amountBg = $("#amountBg").val();
	var amountEd = $("#amountEd").val();
	var status = $("#status").combobox('getValue');
	 param = {
			'billCode':billCode,
			'paybillone':paybillone,
			'revbillone':revBillOne,
			'effectiveTimeBg':effectiveTimeBg,
			'effectiveTimeEd':effectiveTimeEd,
			'amountBg':amountBg,
			'amountEd':amountEd,
			'status':status,
			'sort':sort,
			'order':order
	};
}


/***
 * **************************校验查询参数是否为空*************************************
 * */
function chkParam(){
	var effectiveTimeBg = $("#effectiveTimeBg").datebox('getValue');
	var effectiveTimeEd = $("#effectiveTimeEd").datebox('getValue');
	var amountBg = $("#amountBg").val();
	var amountEd = $("#amountEd").val();
	if(effectiveTimeBg!='' && effectiveTimeEd!='' ){
		if(effectiveTimeBg>effectiveTimeEd){
			return false;
		}
	}
	if(amountBg!='' && amountEd!='' ){
		if(parseInt(amountBg)>parseInt(amountEd)){
			return false;
		}
	}
		return true;
}

/***
 * **************************退票确认**********************************
 * */
function refundconf(pkid,billCode,serialNumber){
	$.messager.confirm("操作提示", "您确定要执行  退票确认  操作吗？", function (data) {
        if (data) {
        	if(pkid != null && pkid != ''){
            	var param = {
            			'pkid':pkid,
            			'serialNumber':serialNumber,
            			'billCode':billCode
            		};
            	var x_url = base + '/bill/refundconf.action';
            	 $.ajax({
            	 	url:x_url,
            	 	type: 'POST',
            	 	data:param,
            	 	dataType: 'JSON',
            	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
            			$.messager.alert('提示信息', '退票确认错误', 'info');
            	     },
            	 	success: function(data){
            	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
            	 	}
            	 });
            }
        }        
    });	
}

/***
 * **************************托收**********************************
 * */
function collect(pkid,billCode,serialNumber){
	$.messager.confirm("操作提示", "您确定要执行  托收  操作吗？", function (data) {
        if (data) {
        	if(pkid != null && pkid != ''){
            	var param = {
            			'operateType':'1',
            			'pkid':pkid,
            			'serialNumber':serialNumber,
            			'billCode':billCode
            		};
            	var x_url = base + '/bill/collect.action';
            	 $.ajax({
            	 	url:x_url,
            	 	type: 'POST',
            	 	data:param,
            	 	dataType: 'JSON',
            	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
            			$.messager.alert('提示信息', '托收错误', 'info');
            	     },
            	 	success: function(data){
            	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
            	 	}
            	 });
            }
        }        
    });	
}

/***
 * **************************贴现**********************************
 * */
function discount(pkid,billCode,serialNumber){
	$.messager.confirm("操作提示", "您确定要执行  贴现  操作吗？", function (data) {
        if (data) {
        	if(pkid != null && pkid != ''){
            	var param = {
            			'operateType':'2',
            			'pkid':pkid,
            			'serialNumber':serialNumber,
            			'billCode':billCode
            		};
            	var x_url = base + '/bill/collect.action';
            	 $.ajax({
            	 	url:x_url,
            	 	type: 'POST',
            	 	data:param,
            	 	dataType: 'JSON',
            	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
            			$.messager.alert('提示信息', '贴现错误', 'info');
            	     },
            	 	success: function(data){
            	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
            	 	}
            	 });
            }
        }        
    });	
}

/***
 * **************************打回**********************************
 * */
function back(pkid,billCode,serialNumber){
	$.messager.confirm("操作提示", "您确定要执行  打回  操作吗？", function (data) {
        if (data) {
        	if(pkid != null && pkid != ''){
            	var param = {
            			'pkid':pkid,
            			'serialNumber':serialNumber,
            			'billCode':billCode
            		};
            	var x_url = base + '/bill/back.action';
            	 $.ajax({
            	 	url:x_url,
            	 	type: 'POST',
            	 	data:param,
            	 	dataType: 'JSON',
            	 	error: function(XMLHttpRequest, textStatus, errorThrown) {
            			$.messager.alert('提示信息', '打回错误', 'info');
            	     },
            	 	success: function(data){
            	 		$('#basic_search_table').datagrid('getPager').pagination('select'); 
            	 	}
            	 });
            }
        }        
    });	
}

/***
 * **************************查询按钮事件*************************************
 * */
function query(sort,order){
	if(!chkParam()){
		$.messager.alert('提示信息', '查询条件输入有误', 'info');
		return;
	}
	var x_url = base + '/bill/getBillList.action';
	$('#basic_search_table').datagrid('options').url = x_url;
	//读取页面查询条件
	queryParam(sort,order);
	$('#basic_search_table').datagrid('load',param);
}

function exportExcel(){
	var billId = $("#billId").val();
	var billCode = $("#billCode").val();
	var paybillone = $("#payBillOne").val();
	var revBillOne = $("#revBillOne").val();
	var effectiveTimeBg = $("#effectiveTimeBg").datebox('getValue');
	var effectiveTimeEd = $("#effectiveTimeEd").datebox('getValue');
	var amountBg = $("#amountBg").val();
	var amountEd = $("#amountEd").val();
	var status = $("#status").combobox('getValue');
	window.location.href= base + '/bill/exportBillList.action?billCode='+billCode
												+"&payBillOne="+paybillone+"&revBillOne="+revBillOne
												+"&effectiveTimeBg="+effectiveTimeBg+"&effectiveTimeEd="+effectiveTimeEd
												+"&amountBg="+amountBg+"&amountEd="+amountEd+"&status="+status;
}



 