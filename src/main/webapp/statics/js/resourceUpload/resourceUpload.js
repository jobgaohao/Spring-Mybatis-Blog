/**
 * 
 */
var datagrid;
var status = "true";
var time = 0;
/**
 */
var _customer ={
		init : function(){
			$('#customer_window').window({
				onClose:function () {
					_customer.clickClearSearchCondition();
				}
			});
			
			if(status == "true"){
				$('#customer_window').window("open");
				_customer.initCustomerDatagrid();
			}else{
				return;
			}
		},
	    clickSearchCustomerBtn : function(){
	    	var customerCode = $('input[name="customerCode"]').val().trim();
	    	var customerName = $('input[name="customerQName"]').val().trim();
	    	var mnemonic = $('input[name="mnemonic"]').val().trim();
	    	var telphone = $('input[name="telphone"]').val().trim();
	    	var abbreviation = $('input[name="abbreviation"]').val().trim();
	    	var taxNo = $('input[name="taxNo"]').val().trim();
	    	var contracted = $("#contracted").combobox('getValue');
	    	
	    	var valid = $("#uploadStatus").combobox('getValue');

	    	if(contracted== 0 ) {
	    		contracted = "";
	    	}
	    	if (valid == 0) {
	    		valid = "";
	    	}
	    	
	    	var jsonParms = {
	    		"customerCode":customerCode,
	    		"customerName":customerName,
	    		"mnemonic":mnemonic,
	    		"telphone":telphone,
	    		"abbreviation":abbreviation,
	    		"taxNo":taxNo,
	    		"contracted":contracted,
	    		"valid":valid
	    	}
			var url = base + '/resourceUpload/queryCustomerList.action';
			$("#customer_datagrid").datagrid({
	            url: url,//加载的URL
	            queryParams:jsonParms
	        });
		},
	    clickClearSearchCondition : function(){
	    	var customerCode = $('input[name="customerCode"]').val("");
	    	var customerName = $('input[name="customerQName"]').val("");
	    	var mnemonic = $('input[name="mnemonic"]').val("");
	    	var telphone = $('input[name="telphone"]').val("");
	    	var abbreviation = $('input[name="abbreviation"]').val("");
	    	var taxNo = $('input[name="taxNo"]').val("");
	    	var contracted = $("#contracted").combobox('setValue','');
	    	var status = $("#uploadStatus").combobox('setValue','T');
		},
	    initCustomerDatagrid : function(){
			url = base+'/resourceUpload/queryCustomerList.action';
			
			customerDatagrid = $("#customer_datagrid").datagrid({
	            url: url,//加载的URL
	            isField: "pkid",
	            striped:true,
	            rownumbers:true,
	            singleSelect: true,
	            selectOnCheck: true,
	            checkOnSelect: true,
	            pageNumber:1,
	            pagination: true,//显示分页
	            pageSize: 20,//分页大小
	            pageList: [10, 20, 50, 100],//每页的个数
	            fit: true,//自动补全
	            fitColumns: true,
	            queryParams:{ "valid":$("#uploadStatus").combobox('getValue')},
	            title: "",
	            columns: [[
	                {field : 'pkid',hidden : true}, 
		              {field : 'customerCode',title : '客户编号',width : 70}, 
		              {field : 'customerName',title : '客户名称',width : 50},
		              {field : 'abbreviation',title : '公司简称',width : 50},
		              {field : 'mnemonic',title : '助记码',width : 50}
		              ]],
		              onDblClickRow : function(rowIndex, rowData){
		      			var customerId = rowData.pkid;
		      			var customerName = rowData.customerName;
		      			$('#customerId').val(customerId);
		      			$('#customerName').combobox('setValue',customerName);
		      			$('#customer_window').window("close");
		      		}
	        });
		},
		clickGetChecked : function(){
			var checked = $("#customer_datagrid").datagrid('getChecked');
			if (checked.length <= 0 ) {
				$.messager.alert("提示信息", "请选择客户！", 'warning');
				return;
			}
			var temp = checked[0];
			
  			var customerId = temp.pkid;
  			var customerName = temp.customerName;
  			$('#customerId').val(customerId);
  			$('#customerName').combobox('setValue',customerName);
  			$('#customer_window').window("close");
		}
	}

function uploadZydFile(){
	var fileName = $('#fileName').val();
	if(fileName == "" || fileName == null){
		$.messager.alert("提示信息", "请输入文件名！", 'error');
		return false;
	}

	var fileContent = $('#fileContent').val();
	if(fileContent == "" || fileContent == null){
		$.messager.alert("提示信息", "请输入资源内容！", 'error');
		return false;
	}
	
	var customerName = $('#customerName').combobox("getValue");
	var customerId = $('#customerId').val();
	if(customerName == "" || customerName == null){
		$.messager.alert("提示信息", "请输入客户信息！", 'error');
		return false;
	}
	var deptId= $('#deptId').val();
	var cityId=$('#cityId').val();
	var areaName=$('#areaName').val();
	if(deptId == "" || cityId == null){
		$.messager.alert("提示信息", "请选择部门信息！", 'error');
		return false;
	}
	
	$.myShadow.show();
	$.post(
			base + "/resourceUpload/manualUpload.action",
			{
	    		"customerId":customerId,
	    		"customerName":customerName,
	    		"fileContent":fileContent,
	    		"fileName":fileName,
	    		"deptId":deptId,
	    		"cityId":cityId,
	    		"areaName":areaName
	    	},
			function(res){
	    		$.myShadow.remove();
				if(res.success){
					$.messager.alert("提示信息", "上传成功！", "info");
					$('#fileName').val("");
//					$('#fileContent').textbox('setValue','');
					$('#fileContent').val("");
					
					//资源单管理重新上传弹窗关闭
					var isclose=$('#resMangerUpload').val();
					
					if(isclose=='open'){
						 $("#showReviewInfoDetail").window('close');
                		 parent.$('#showReviewInfoDetail').window('close');
                		
                		
					}
				}else{
					$.messager.alert("提示信息", res.message, "error");
				}
			}
	);
}

function clearText(){
	 $('#fileName').val("");
//	 $('#fileContent').textbox('setValue','');
	 $('#fileContent').val("");
}

function initDept() {
	$('#deptInfo').combobox({    
	    url:base +'/resourceManager/getCityDept.action',    
	    valueField:'id',    
	    textField:'text',
	    onLoadSuccess: function () { //加载完成后,设置选中第一项
            var val = $(this).combobox("getData");
            for (var item in val[0]) {
                if (item == "id") {
                    $(this).combobox("select", val[0][item]);
                }
               if (item == "area") {
                	var area=val[0][item];
                	if(!(undefined == area||""== area)){
                		$("#areaInfo").show();
        				var parea = $("#place");
        				parea.empty();
        				var data=area.split(',');
        				 parea.append("<option>&nbsp;</option>");
        				for(var i=0;i<data.length+1;i++) {
        					
        					var option = $("<option>").text(data[i]).val(data[i]);
        				    parea.append(option);
        				}	
        				
                	}else{
                    	$("#areaInfo").hide();
                    	$('#areaName').val("");
                    }
                }
            }
            
            var deptFullValue=$("#deptFullValue").val();
            if(!(undefined == deptFullValue||""== deptFullValue)){
        	   $("#deptInfo").combobox("select",deptFullValue);;
            } 
        },
        onSelect: function(rec){
        	var temp = $("#deptInfo").combobox("getValue");
        	if (temp == "") {
        		return;
        	}
        	var arr =temp.split("-");
        	$("#deptId").val(arr[0]);
        	$("#cityId").val(arr[1]);
        	var area=arr[2];
        	//资源单管理重新上传弹窗带过来的数据值 
        	var zydAreaName=$('#zydAreaName').val();
        	
        	if(!(undefined == area||""== area)){
        		$("#areaInfo").show();
				var parea = $("#place");
				parea.empty();
				 parea.append("<option>&nbsp;</option>");
				var data=area.split(',');
				for(var i=0;i<data.length;i++) {
				    var option = $("<option>").text(data[i]).val(data[i]);
				    parea.append(option);
				}
//				$('#areaName').val(data[0]);
	        	
				if(!(undefined == zydAreaName||""== zydAreaName)){
				    $("#place").val(zydAreaName);
				}
        	}else{
            	$("#areaInfo").hide();
            }
        },
        
	});
}


function closeCustomerWin() {
	$('#customer_window').window('close');
	var customerCode = $('input[name="customerCode"]').val("");
	var customerName = $('input[name="customerQName"]').val("");
	var mnemonic = $('input[name="mnemonic"]').val("");
	var telphone = $('input[name="telphone"]').val("");
	var abbreviation = $('input[name="abbreviation"]').val("");
	var taxNo = $('input[name="taxNo"]').val("");
	var contracted = $("#contracted").combobox('setValue','');
}

function initDragUpload() {
	 var url=base +"/resourceUpload/uploadFile.action";
	 Dropzone.options.uploadForm = {
         url: url,
         acceptedFiles: ".txt,.doc,.docx,.xls,.xlsx",
         addRemoveLinks: true,
         clickable: true,
         autoProcessQueue: true, 
         uploadMultiple: false,
         parallelUploads: 10, 
         maxFiles: 1, 
         dictDefaultMessage: '<font size="5" face="方正舒体" color="black">拖动文件至该处(或点击此处)<font>',
         dictInvalidFileType: '只支持txt,doc,docx,xls,xlsx文件上传',
         dictFileTooBig: '',
         dictMaxFilesExceeded: '超出最大上传数量',
         dictCancelUpload: '取消上传',
         dictRemoveFile: '去除文件',
         dictCancelUploadConfirmation: '确认取消上传',
         init: function() {
        	 var _this = this;
             this.on("addedfile", function(file) {
            	 	var value=$('#customerName').combobox('getValue');
            	 	$('#customerHideName').val(value);
            	 	
            		var customerName = $('#customerName').combobox('getValue');
            		if(customerName == "" || customerName == null){
            			$.messager.alert("提示信息", "请输入客户信息！", 'error');
            			_this.removeAllFiles(true);
            		}
             });
             this.on("success", function(file,response) {
            	 _this.removeAllFiles(true);
            	// alert($("#resMangerUpload").val());
                 if(response.success){
//                	
                	 if ($("#resMangerUpload").val() == "open") {
                		// console.log($("#showReviewInfoDetail"));
                		// $.messager.alert("提示信息", "上传成功！", "info");
                		 $("#showReviewInfoDetail").window('close');
                		 parent.$('#showReviewInfoDetail').window('close');
                		// $("#resMangerUpload").val(true);
                		
                		 
                		 
                	 } else {
                		 $.messager.alert("提示信息", "上传成功！", "info");
                	 }
                     
                  }else{
                  	$.messager.alert("提示信息", response.message, "error");
                  }
             });
         }
     }
}


$(document).ready(function() {
    initDept();
    
    $("input[name=setFileName]").bind("change", function (){
		if($("input[name='setFileName']").is(':checked')){
			$("input[name='setPersonName']").prop("checked",true);
		}else{
			$("input[name='setPersonName']").prop("checked",false);
		}
	});
	
    $("input[name='setFileName']").prop('checked',true);
    $("input[name='setPersonName']").prop('checked',true);
    	
    $('#place').change(function(){
 	   var value=$(this).children('option:selected').val();//这就是selected的值
 	   $('#areaName').val(value);
 	}) 

 	initDragUpload();
    
    //初始化combobox
    $("#customerName").combobox({

    	valueField:'value',    
        textField:'value',
        hasDownArrow:true,
        editable:true,
       
        onSelect:function () {
        	var companyId = $("#customerName").combobox("getValue");
            var comName = $("#customerName").combobox("getText");
           // alert(companyId);
            $('#customerId').val(companyId);
  			$('#customerName').val(comName);
  			//$(this).combobox('setValue', companyId);
        }
    	});  
    time = setTimeout('getInputFocus()',500);
    
    $("#customerName").combobox({
    	onChange:function () {
    		var value = $(this).combobox('getText');
    			  $.get(base+'/resourceUpload/queryCustomerByName.action?&key='+encodeURI(encodeURI(value)), function (result) {
    	    			
    	    		      $("#customerName").combobox('loadData', result);
    	    			
    	    		   });
    		  
        		
    		

    	}
    });
   
	
});

function loadHistory() {
	clearTimeout(time);
	//$.get(base+'/resourceUpload/getSearchCustomer.action', function (result) {
	
    $("#customerName").combobox('reload', base+'/resourceUpload/getSearchCustomer.action');
    $("#customerName").combobox("showPanel");
//  });
}

function getInputFocus() {
	  $('#customerName').next('span').find('input:first').focus(function (){
		  
		  loadHistory();
		      
	});
	
}

//function showComHistory() {
//	alert(222);
////	
//}
