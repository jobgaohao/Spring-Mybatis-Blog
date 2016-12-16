$(function() {

	$('#source_tabs').tabs({   
        height: $("#div_source_center").height() - 5
    });
    $('#resourceconfig_div_3').height($("#div_source_center").height() - 160);
    $('#deptRule_div_3').height($("#div_source_center").height() - 160);
    
	// 回车按键 查询
	document.onkeydown = function(event) {
		var e = event ? event : (window.event ? window.event : null);
		if (e.keyCode == 13) {
			var hasDlg = false;
			$(".window").each(
					function() {
						if ($(this).css('display') != "none"
								&& $(this).hasClass("panel")) {
							hasDlg = true;
						}
					});
			if (!hasDlg) {
				queryDeptRule();
				queryResourceConfig();
			} else {

			}
		}
	}
	queryResourceConfigList();
});
// 查询资源池设定列表信息
function queryResourceConfigList() {

	datagrid = $("#resourceconfig_table_2").datagrid(
			{
				url : base + '/resourceConfig/queryResourceConfigList.action',
				queryParams : {},
				loadMsg : '数据加载中...',
				collapsible : true,
				nowrap : false,
				striped : true,
				fitColumns : false,
				rownumbers : true,
				singleSelect : true,
				selectOnCheck : true,
				checkOnSelect : true,
				remoteSort : false,
				pagination : false,
				fit : true,
				hideColumn : [ [ {
					field : 'id',
					resizable : false
				} ] ],
				columns : [ [ {
					field : 'cityId',
					title : '城市编号',
					width : 160,
				}, {
					field : 'code',
					title : '资源编号',
					width : 160,
				}, {
					field : 'aliasName',
					title : '别名',
					width : 160,
					formatter: function(value,row,index){
						return "<pre>"+value+"</pre>";
					}
				}, {
					field : 'template',
					title : '模板编号',
					width : 160
				}, {
					field : 'area',
					title : '区域',
					width : 160,
				}, {
					field : 'addedTime',
					title : '新增时间',
					width : 150
				}, {
					field : 'valid',
					title : '是否作废',
					width : 150
				} ] ],

				// 显示html语言
				loadFilter : function(data) {
					for (var i = 0; i < data.rows.length; i++) {
						for ( var att in data.rows[i]) {
							if (typeof (data.rows[i][att]) == "string") {
								data.rows[i][att] = data.rows[i][att].replace(
										/</g, "&lt;").replace(/>/g, "&gt;");
							}
						}
					}
					return data;
				},
				// 加载
				onLoadSuccess : function(data) {
					$(this).datagrid("fixRownumber"); // 序号自适应
					
					//重新渲染tooltip
					$(".easyui-panel").tooltip({
						position: 'bottom',
						hideEvent: 'none',
						onShow: function(){
							$(this).tooltip('tip').css({
								backgroundColor: '##464646',
								borderColor: '#ff0000',
								boxShadow: '1px 1px 3px #292929'
							});
							var t = $(this);
							t.tooltip('tip').focus().unbind().bind('blur',function(){
								t.tooltip('destroy');
							});
						},
						onPosition: function(){
							$(this).tooltip('tip').css('left', $(this).offset().left);
							$(this).tooltip('arrow').css('left', 20);
						}
					});

				}
			});
}

// toolbar 新增页面初始化
function addResourceConfig() {
	$("#resourceConfigAdd_form").form('clear');
	$('#resourceConfigAddDiv').window("open");
	$('#saveResourceConfigForm').show();
}

// toolbar 修改页面初始化
function editResourceConfig() {
	if (null == $('#resourceconfig_table_2').datagrid('getRows')) {
		$.messager.alert('提示信息', '请先新增一条资源池设定信息!', 'info');
		return false;
	}
	var rows = $('#resourceconfig_table_2').datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示信息', '请先选择一条资源池设定信息!', 'info');
	} else {
		var i = rows.length - 1;
		var id = rows[i].id;
		$.ajax({
			url : base + "/resourceConfig/queryResourceConfig.action",
			type : "post",
			data : {
				id : id
			},
			cache : false,
			success : function(data) {
				if (data != null) {
					$("#resourceConfigEdit_form").form('clear');
					$('#resourceConfigEditDiv').window("open");
					$('#saveResourceConfigForm').show();
					$("#edit_cityId").textbox('setValue', data.cityId);
					$("#edit_code").textbox('setValue', data.code);
					$("#edit_aliasName").textbox('setValue', data.aliasName);
					$("#edit_template").textbox('setValue', data.template);
					$("#edit_area").textbox('setValue', data.area);
					$("#edit_id").val(data.id);
				} else {
					$.messager.alert("提示信息", "失败，该条数据不存在！", "info");
					$("#resourceconfig_table_2").datagrid('reload');
				}
			}
		});
	}
}

// toolbar 启用停用
function openOrCloseResourceConfig() {
	if (null == $('#resourceconfig_table_2').datagrid('getRows')) {
		$.messager.alert('提示信息', '请先新增一条资源池设定信息!', 'info');
		return false;
	}
	var rows = $('#resourceconfig_table_2').datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示信息', '请先选择一条资源池设定信息!', 'info');
	} else {
		var i = rows.length - 1;
		var id = rows[i].id;
		var valid = rows[i].valid;
		if (valid == "T") {
			var MsgCloseOrOpen = "确定停用吗？";
			var MsgCloseOrOpenisOK = "停用成功";
		} else {
			var MsgCloseOrOpen = "确定启用吗？";
			var MsgCloseOrOpenisOK = "启用成功";
		}
		$.messager
				.confirm(
						'提示信息',MsgCloseOrOpen,function(data) {
							if (data) {
								$.ajax({
										url : base+ "/resourceConfig/openOrCloseResourceConfig.action",
										type : "post",
										data : {
											id : id,
											valid : valid
										},
										cache : false,
										success : function(data) {
											if (!data.success) {
												$.messager.alert("提示信息",data.message,"info");
											} else {
												$.messager.alert("提示信息",MsgCloseOrOpenisOK,"success");
												$("#resourceconfig_table_2").datagrid('reload');
											}
												$.messager.progress('close');
											},
											async : false
								  });
							}
						});
	}
}

// 立即查询(条件查询)
function queryResourceConfig() {
	var param = {
		"aliasName" : $("#aliasName").val().replace(/(^\s*)|(\s*$)/g, "")
	};
	$("#resourceconfig_table_2").datagrid("load", param);

}

// 保存-新增
function submitResourceConfigForm1() {
	// 检查新增框是否打开
	var isValidAdd = $('#resourceConfigAdd_form').form('validate');
	if (!isValidAdd) {
		return false;
	}
	// 新增
	// 去两边空格
	var form_cityId = $("#add_cityId").val().replace(/(^\s*)|(\s*$)/g, "");
	var form_code = $("#add_code").val().replace(/(^\s*)|(\s*$)/g, "");
	var form_aliasName = $("#add_aliasName").val()
			.replace(/(^\s*)|(\s*$)/g, "");
	var form_template = $("#add_template").val().replace(/(^\s*)|(\s*$)/g, "");
	var form_area = $("#add_area").val().replace(/(^\s*)|(\s*$)/g, "");
	$("#add_cityId").textbox('setValue', form_cityId);
	$("#add_code").textbox('setValue', form_code);
	$("#add_aliasName").textbox('setValue', form_aliasName);
	$("#add_template").textbox('setValue', form_template);
	$("#add_area").textbox('setValue', form_area);
	// 防呆
	if (form_cityId == "" || form_cityId == null) {
		$.messager.alert("提示信息", "请输入城市编号！", "info");
		return false;
	}
	if (form_code == "" || form_code == null) {
		$.messager.alert("提示信息", "请输入资源编号！", "info");
		return false;
	}
	if (form_aliasName == "" || form_aliasName == null) {
		$.messager.alert("提示信息", "请输入别名！", "info");
		return false;
	}
	if (form_template == "" || form_template == null) {
		$.messager.alert("提示信息", "请输入模板编号！", "info");
		return false;
	}
	var obj = setObjProteryByForm("resourceConfigAdd_form", "form_");
	$.ajax({
		url : base + "/resourceConfig/saveResourceConfig.action",
		type : "post",
		data : obj,
		cache : false,
		success : function(data) {
			if (!data.success) {
				$.messager.alert("提示信息", data.message, "info");
			} else {
				$.messager.alert("提示信息", "新增成功！", "success");
				$("#resourceconfig_table_2").datagrid('reload');
				closeResourceConfigForm();
			}
			$.messager.progress('close');
		},
		async : false
	});
}

// 保存-修改
function submitResourceConfigForm2() {
	// 检查修改框是否打开
	var isValidEdit = $('#resourceConfigEdit_form').form('validate');
	if (!isValidEdit) {
		return false;
	}
	// 修改
	var form_cityId = $("#edit_cityId").val().replace(/(^\s*)|(\s*$)/g, "");
	var form_code = $("#edit_code").val().replace(/(^\s*)|(\s*$)/g, "");
	var form_aliasName = $("#edit_aliasName").val().replace(/(^\s*)|(\s*$)/g,"");
	var form_template = $("#edit_template").val().replace(/(^\s*)|(\s*$)/g, "");
	var form_area = $("#edit_area").val().replace(/(^\s*)|(\s*$)/g, "");
	$("#edit_cityId").textbox('setValue', form_cityId);
	$("#edit_code").textbox('setValue', form_code);
	$("#edit_aliasName").textbox('setValue', form_aliasName);
	$("#edit_template").textbox('setValue', form_template);
	$("#edit_area").textbox('setValue', form_area);
	// 防呆
	if (form_cityId == "" || form_cityId == null) {
		$.messager.alert("提示信息", "请输入城市编号！", "info");
		return false;
	}
	if (form_code == "" || form_code == null) {
		$.messager.alert("提示信息", "请输入资源编号！", "info");
		return false;
	}
	if (form_aliasName == "" || form_aliasName == null) {
		$.messager.alert("提示信息", "请输入别名！", "info");
		return false;
	}
	if (form_template == "" || form_template == null) {
		$.messager.alert("提示信息", "请输入模板编号！", "info");
		return false;
	}
	var obj = setObjProteryByForm("resourceConfigEdit_form", "form_");
	$.ajax({
		url : base + "/resourceConfig/saveResourceConfig.action",
		type : "post",
		data : obj,
		cache : false,
		success : function(data) {
			if (!data.success) {
				$.messager.alert("提示信息", data.message, "info");
			} else {
				$.messager.alert("提示信息", "修改成功！", "success");
				$("#resourceconfig_table_2").datagrid('reload');
				closeResourceConfigForm();
			}
			$.messager.progress('close');
		},
		async : false
	});
}
// 关闭保存页面
function closeResourceConfigForm() {
	$('#resourceConfigEditDiv').window('close');
	$('#resourceConfigAddDiv').window('close');
	$("#resourceConfigAdd_form").form('clear');
	$("#resourceConfigEdit_form").form('clear');
}
