
$(function () {
	
	$('#addTime').datebox('setValue', formatterDate(new Date()));
//	
	initDept();
//	
//	initCustomer();
//	
//	//if ($("#deptsId").combobox("getValue") != "") {
////	var searchObj = setTimeout(searchResource, 2000);
//	//}
//	
//	$('#packageNo').textbox('textbox').keydown(function (e) {
//        if (e.keyCode == 13) {
//        	searchResource();
//        }
//    });
	
});


/***
 * 更换绑定公司
 */
var _customer ={
		init : function(){
			$('#customer_window').window({
				onClose:function () {
					_customer.clickClearSearchCondition();
				}
			});
			
			$('#customer_window').window("open");
			_customer.initCustomerDatagrid();
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
		      			
		      			var zydId = $('#zyd_id').val();
		      			var deptsId = $('#depts_id').val();
		      			var cityId = $('#city_id').val();
		      			$.post(base+"/resourceManager/updateContant.action",{"zydId":zydId,"deptsId":deptsId, "cityId":cityId,"companyId":customerId,"comName":customerName},function(result) {
		      				if (result.success) {
		      					
		      					$('#customer_window').window("close");
		      					searchResource();
		      					//$('#customer_window').window("close");
		      					
		      				}
		      			});
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
  			
  			var zydId = $('#zyd_id').val();
  			var deptsId = $('#depts_id').val();
  			var cityId = $('#city_id').val();
  			$.post(base+"/resourceManager/updateContant.action",{"zydId":zydId,"deptsId":deptsId, "cityId":cityId,"companyId":customerId,"comName":customerName},function(result) {
  				if (result.success) {
  					
  					$('#customer_window').window("close");
  					searchResource();
  					//$('#customer_window').window("close");
  					
  				}
  			});

  			$('#customer_window').window("close");
		}
	}

/**
 * 初始化tab
 */
function initCustomer() {
	
	$('#customer_datagrid_list').datagrid({
		//idField:"stockinCode",//跨页选中同一批次
		//rownumbers:true,
		 striped:true,
         rownumbers:true,
         singleSelect: true,
         selectOnCheck: true,
         checkOnSelect: true,
         pagination: false,//显示分页
         pageSize: 20,//分页大小
         pageList: [10, 20, 50, 100],//每页的个数
         fit: true,//自动补全
         //fitColumns: true,

		url:base +"/customerUserRelation/getCustomerUserRelations.action",
		
		columns:[[
				
                  { field:'ck',checkbox:true },				  //{ field: 'stockinCode', title:'', width: 5},
		          { field: 'customerName', title: "公司名称", width: 260, align:'center' },
                  { field: 'oriName', title: "文件名", width: 240, align:'center'},
                  { field: 'lastUploadName', title: "上传人", width: 140, align:'center' },
                  { field: 'addedTime', title: "上传时间", width: 150, align:'center', formatter:convertime },
                  { field: '_operate', title: "操作", width: 220, align:'center', formatter:formatCustomer }
		]]});
//	$("#resTab").tabs({    
//		title:'资源单列表',
//		content: '<iframe scrolling="no" frameborder="0"  src="' + href + '" style="width:100%;height:99%;"></iframe>',
//	});
}

/**
 * 重新上传
 * @param val
 * @param row
 * @param index
 * @returns {String}
 */
function formatCustomer (val,row,index) {
	var zydId = row.zydId;
	var cityId = row.cityId;
	var deptsId = row.staffOrgId;
	var comName = row.customerName;
	var companyId = row.customerId;
	var area = "";
	if (zydId==undefined) {
		zydId = "";
	}
	return "<input type='button' value='重新上传' onclick=\"uploadB1('"+zydId+"', '"+cityId+"', '"+deptsId+"', '"+comName+"', '"+companyId+"', '"+area+"')\"  /> ";
}

/**
 * 我维护的B1重新上传
 * @param zydId
 * @param cityId
 * @param deptsId
 * @param comName
 * @param companyId
 * @returns {Boolean}
 */
function uploadB1(zydId, cityId, deptsId, comName, companyId, area) {
	var deptFullValue=$("#deptsId").combobox("getValue");
	
	var send_url = base+'/resourceManager/toUpload.action?zydId='+zydId+'&cityId='+cityId+'&deptsId='+deptsId+"&comName="+ encodeURI(encodeURI(comName))+"&companyId="+companyId+"&resUpload=open&areaName="+encodeURI(encodeURI(area))+"&deptFullValue="+encodeURI(encodeURI(deptFullValue));
 	$("#showReviewInfoDetailPart").attr("src",send_url);
	$("#showReviewInfoDetail").window('open');
	$("#showReviewInfoDetail").window({
		onClose: function () { //当面板关闭触发的事件
					  $.messager.alert("提示信息", "上传成功！", "info");
					//  searchResource();
				  }
			});
      return false;
}

//时间初始化
formatterDate = function (date) {
	var day = date.getDate() >9? date.getDate():"0"+date.getDate();
	var month = (date.getMonth() + 1) >9?(date.getMonth() + 1):"0"+(date.getMonth() + 1);
	return date.getFullYear() + '-'+month+'-'+day;
}


function upload(zydId, cityId, deptsId, comName, companyId, area) {
	if(comName=="") {
		$.messager.confirm('确认','绑定公司为空您确认要上传么?',function(r){    
		    if (r){    
		    	var deptFullValue=$("#deptsId").combobox("getValue");
		    	var send_url = base+'/resourceManager/toUpload.action?zydId='+zydId+'&cityId='+cityId+'&deptsId='+deptsId+"&comName="+ encodeURI(encodeURI(comName))+"&companyId="+companyId+"&resUpload=open&areaName="+encodeURI(encodeURI(area))+"&deptFullValue="+encodeURI(encodeURI(deptFullValue));
		     	$("#showReviewInfoDetailPart").attr("src",send_url);
		     	$("#showReviewInfoDetail").window({
		    		onClose: function () { //当面板关闭触发的事件
		    			
		    			
		    				
		    				 // searchResource();
		    			
		    					 
		    			   }
		    			});
		    	$("#showReviewInfoDetail").window('open');    
		    }    
		});  

	} else {
		var deptFullValue=$("#deptsId").combobox("getValue");
		var send_url = base+'/resourceManager/toUpload.action?zydId='+zydId+'&cityId='+cityId+'&deptsId='+deptsId+"&comName="+ encodeURI(encodeURI(comName))+"&companyId="+companyId+"&resUpload=open&areaName="+encodeURI(encodeURI(area))+"&deptFullValue="+encodeURI(encodeURI(deptFullValue));
	 	$("#showReviewInfoDetailPart").attr("src",send_url);
	 	$("#showReviewInfoDetail").window({
			onClose: function () { //当面板关闭触发的事件
				
				
					
					 // searchResource();
				
						 
				   }
				});
		$("#showReviewInfoDetail").window('open');
	}

	
      //return false;
	
//	$('#window').dialog({    
//	    title: '重新上传',    
//	    width: 800,    
//	    height: 450,    
//	    closed: false,    
//	    cache: false,    
//	    href: base+'/resourceManager/toUpload.action?zydId='+zydId+'&cityId='+cityId+'&deptsId='+deptsId+"&comName="+ encodeURI(encodeURI(comName))+"&companyId="+companyId,    
//	    modal: true   
//	}); 
}


/**
 * 初始化部门
 */
function initDept() {
	
	$('#deptsId').combobox({    
	    url:base +'/resourceManager/getCityDept.action',    
	    valueField:'id',    
	    textField:'text',
	    onLoadSuccess: function () { //加载完成后,设置选中第一项
            var comBoxArr = $(this).combobox("getData");
            //console.log(val[0]);
            var deptsId = $("#deptId").val();
        	var cityId = $("#cityId").val();
        	
        	//有默认值  设置combobox选中默认值
        	if (deptsId != "" && cityId != "") {
        		for (var i =0; i<comBoxArr.length; i++) {
        			var val = comBoxArr[i].id;
        			
        			var strArr = val.split("-");
        			
        			if (deptsId == strArr[0] && cityId == strArr[1]) {
        				$(this).combobox("select",  comBoxArr[i]["id"]);
        			}
        		}
        		//如果没有默认值 默认选中第一行
        	} else {
        		for (var item in comBoxArr[0]) {
                	
                    if (item == "id") {
                        $(this).combobox("select", comBoxArr[0][item]);
                    }
                }
        	}
        	//console.log(comBoxArr);
            
            
//            searchResource();
           
        },
        onSelect: function(rec){
        	
        	searchResource();
        }
	});
}
/**
 * 搜索按钮
 */
function btnsearch() {
	searchResource();
}

/**
 * 设置城市和部门编号 
 */
function setCityDept() {
	var temp = $("#deptsId").combobox("getValue");
	if (temp == "") {
		return;
	}
	var arr =temp.split("-");
	
	//console.log(arr);
	$("#deptId").val(arr[0]);
	$("#cityId").val(arr[1]);
	//$("#areaName").val(arr[2]);
}



function searchResource() {
	
	//alert($("#deptsId").combobox("getValue"));
	//console.log(form2Json("searchForm"));
	
	var deptsId = $("#deptId").val();
	var cityId = $("#cityId").val();
//	if (deptsId != "" && cityId != "") {
//		
//	} else {
//		
//	}
//	console.log($('#addTime').datebox("getValue"));
	//得到选中的数据值 进行设置
	setCityDept();
	loadDatagrid();
}

function loadDatagrid() {

	$('#main_datagrid_list').datagrid({
		//idField:"stockinCode",//跨页选中同一批次
		//rownumbers:true,
		 striped:true,
         rownumbers:true,
         singleSelect: true,
         selectOnCheck: false,
         checkOnSelect: false,
         pagination: true,//显示分页
         pageSize: 20,//分页大小
         pageList: [10, 20, 50, 100],//每页的个数
         fit: true,//自动补全
         //fitColumns: true,

		url:base +"/resourceManager/getBindedList.action",
		queryParams: form2Json("searchForm"),//条件查询
		columns:[[
				
                  { field:'ck',checkbox:true },				  //{ field: 'stockinCode', title:'', width: 5},
		          { field: 'oriName', title: "文件名", width: 260, align:'center',formatter: function(value,row,index){
		        	  //文件名称 - 路径
		        	  var fileName = row.fileName;
		        	  //原文件名
		        	  var oriName = row.oriName;
		        	  //文件扩展名
		        	  var cityId = row.cityId;
		        	  var zydId = row.zydId; 
		        	  var ext = row.fileExt;
		        	  return "<a href='javascript:void(0)' onclick=\"downFile('"+oriName+"', '"+zydId+"', '"+cityId+"', '"+fileName+"')\">"+value+"</a>";
		          } },
                  { field: 'comName', title: "绑定公司", width: 380, align:'center', dataalign:'right', formatter:updateContact},
                  { field: 'lastUploadName', title: "上传人", width: 140, align:'center' },
                  { field: 'addTime', title: "时间", width: 150, align:'center', formatter:convertime },
                  { field: '_operate', title: "操作", width: 220, align:'center', formatter:formatOper }
		]],

		onLoadSuccess: function (data) {
			
			
			
			
			
			
			
			
			var fields=$("#main_datagrid_list").datagrid('getColumnFields',false);
		//获取数据表的每一行,注意如果不加.datagrid-view2限制,则含有行号表
			var bodyTts = $(".datagrid-view2 .datagrid-body table tr.datagrid-row");
		    //console.log(bodyTts);
			bodyTts.each(function (ii, objj) {
				var bodyTds = $(objj).children();
				bodyTds.each(function (i, obj) {
					var col = $("#main_datagrid_list").datagrid('getColumnOption',fields[i]);
					if (!col.hidden && !col.checkbox)
					{
						var dataalign=col.dataalign||col.align||'right';
						$("div:first-child", obj).css("text-align", dataalign);
//						$("div:contactStyle", obj).css("text-align", "center");
					}
				});
			});
//			
		}
	});	
}

/**
 * 转换时间 
 * @param val
 * @param row
 * @param index
 */
function convertime(val,row,index) {
	return val.replace(".000","");
}

/**
 * 修改绑定公司
 * @param val
 * @param row
 * @param index
 * @returns {String}
 */
function updateContact (val,row,index) {
	var zydId = row.zydId;
	var cityId = row.cityId;
	var deptsId = row.deptsId;
	//alert(cityId);
	return "<font style='padding:20px;'>"+row.comName+"</font><input type='button'style='margin-right:5px;' value='更换' onclick=\"clickComName('"+zydId+"', '"+cityId+"', '"+deptsId+"')\"/>";
}
function clickComName(zydId, cityId, deptsId) {
	//alert(zydId);
	_customer.init();
	$("#zyd_id").val(zydId);
	$("#city_id").val(cityId);
	$("#depts_id").val(deptsId);
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


function formatOper (val,row,index) {
	var zydId = row.zydId;
	var cityId = row.cityId;
//	
	var deptsId = row.deptsId;
	var comName = row.comName;
	var companyId = row.companyId;
	var area = row.area;
	return "<input type='button' value='删除' onclick=\"deleteBtn('"+zydId+"', '"+cityId+"', '"+deptsId+"')\" /> <input type='button' value='解析结果 ' onclick=\"getSpots('"+zydId+"', '"+cityId+"', '"+deptsId+"')\" /> <input type='button' value='重新上传' onclick=\"upload('"+zydId+"', '"+cityId+"', '"+deptsId+"', '"+comName+"', '"+companyId+"', '"+area+"')\" /> ";
}
//下载文件
function downFile(oriName,  zydId, cityId, fileName) {
	window.location.href = base+"/resourceManager/downFile.action?oriName="+encodeURI(encodeURI(oriName))+"&zydId="+zydId+"&cityId="+cityId+"&fileName="+fileName;
	//修改下载次数
//	$.post(base+"/resourceManager/downFile.action",{"zydId":zydId,"cityId":cityId, "oriName":oriName, "fileName":fileName},function(result){
//		
//	  });
//	
	
}





function getSpots (zydId, cityId, deptsId) {
	$('#window').dialog({    
	    title: '现货查看',    
	    width: 650,    
	    height: 400,    
	    closed: false,    
	    cache: false,    
	    href: base+'/resourceManager/toResourceSpot.action?zydId='+zydId+'&cityId='+cityId+'&deptsId='+deptsId,    
	    modal: true   
	}); 
}

/**
 * 删除
 * @param zydId
 * @param cityId
 * @param deptsId
 */
function deleteBtn(zydId, cityId, deptsId) {

	
	$.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
	    if (r){    
	    	$.post(base+"/resourceManager/deleteZyd.action",{"zydId":zydId,"cityId":cityId, "deptsId":deptsId},function(result){
	   		 if (result.success) {
	   			 $.messager.alert('提示','删除成功！');   
	   			 searchResource();
	   		 } 
	   	  });    
	    }    
	});  
	
}

/**
 * 批量删除
 */
function deleteBatch() {
	var checked = $("#main_datagrid_list").datagrid("getChecked");
//	console.log(checked);
	if (checked.length<=0) {
		 $.messager.alert('提示','请勾选需要删除的行！');   
		 return ;
	}
	var zydIds = "";
	
	for(var i=0;i<checked.length;i++){
		zydIds+=checked[i].zydId+",";
	}
	var cityId = $("#cityId").val();
	var deptsId = $("#deptId").val();
	
	$.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
	    if (r){  
	    	$.post(base+"/resourceManager/deleteBatch.action",{"zydIdStr":zydIds,"cityId":cityId, "deptsId":deptsId},function(result){
	   		 if (result.success) {
	   			 $.messager.alert('提示','删除成功！');   
	   			 searchResource();
	   		 } 
	   	  });
	    	
	    }
	});
	
	
}

