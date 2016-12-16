$(function() {

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
	queryDeptRuleList();
});
// 查询资源池设定列表信息
function queryDeptRuleList() {

	datagrid = $("#deptRule_table_2").datagrid(
			{
				url : base + '/deptRule/queryDeptRuleList.action',
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
					field : 'pkid',
					resizable : false
				} ] ],
				columns : [ [ {
					field : 'deptName',
					title : '部门名称',
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
function addDeptRule() {
	$("#deptRuleAdd_form").form('clear');
	$('#deptRuleAddDiv').window("open");
	$('#saveDeptRuleForm').show();
}

// toolbar 启用停用
function openOrCloseDeptRule() {
	if (null == $('#deptRule_table_2').datagrid('getRows')) {
		$.messager.alert('提示信息', '请先新增一条部门权限信息!', 'info');
		return false;
	}
	var rows = $('#deptRule_table_2').datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示信息', '请先选择一条部门权限信息!', 'info');
	} else {
		var i = rows.length - 1;
		var pkid = rows[i].pkid;
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
										url : base+ "/deptRule/openOrCloseDeptRule.action",
										type : "post",
										data : {
											pkid : pkid,
											valid : valid
										},
										cache : false,
										success : function(data) {
											if (!data.success) {
												$.messager.alert("提示信息",data.message,"info");
											} else {
												$.messager.alert("提示信息",MsgCloseOrOpenisOK,"success");
												$("#deptRule_table_2").datagrid('reload');
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
function queryDeptRule() {
	var param = {
		"aliasName" : $("#rule_aliasName").val().replace(/(^\s*)|(\s*$)/g, "")
	};
	$("#deptRule_table_2").datagrid("load", param);

}

// 保存-新增
function submitDeptRuleForm() {
	// 检查新增框是否打开
	var isValidAdd = $('#deptRuleAdd_form').form('validate');
	if (!isValidAdd) {
		return false;
	}
	// 新增
	// 去两边空格
	var deptName = $("#deptName").val().replace(/(^\s*)|(\s*$)/g, "");
	var deptId = $("#deptId").val().replace(/(^\s*)|(\s*$)/g, "");
	var code = $("#code").val()
			.replace(/(^\s*)|(\s*$)/g, "");
	$("#deptName").textbox('setValue', deptName);
	$("#deptId").val(deptId);
	$("#code").textbox('setValue',code);
	// 防呆
	if (deptName == "" || deptName == null) {
		$.messager.alert("提示信息", "请输入部门名称！", "info");
		return false;
	}
	if (deptId == "" || deptId == null) {
		$.messager.alert("提示信息", "部门选择失败，请重新选择！", "info");
		return false;
	}
	if (code == "" || code == null) {
		$.messager.alert("提示信息", "请输入资源池编号！", "info");
		return false;
	}
	var obj = setObjProteryByForm("deptRuleAdd_form", "form_");
	$.ajax({
		url : base + "/deptRule/saveDeptRule.action",
		type : "post",
		data : obj,
		cache : false,
		success : function(data) {
			if (!data.success) {
				$.messager.alert("提示信息", data.message, "info");
			} else {
				$.messager.alert("提示信息", "新增成功！", "success");
				$("#deptRule_table_2").datagrid('reload');
				closeDeptRuleForm();
			}
			$.messager.progress('close');
		},
		async : false
	});
}


// 关闭保存页面
function closeDeptRuleForm() {
	$('#deptRuleAddDiv').window('close');
	$("#deptRuleAdd_form").form('clear');
}

