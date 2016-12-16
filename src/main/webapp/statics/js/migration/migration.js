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
				queryMigration();
			} else {

			}
		}
	}
	queryMigrationList();
});
// 查询资源池设定列表信息
function queryMigrationList() {

	datagrid = $("#migration_table_2").datagrid(
			{
				url : base + '/migration/queryList.action',
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
					field : 'sqlTxt',
					title : 'SQL内容',
					width : 800,
					editor:{
						type:'text',
						name:'sqlTxt'
					}
				}, {
					field : 'comment',
					title : '备注',
					width : 150,
				}, {
					field : 'suffix',
					title : '后缀',
					width : 50,
				}, {
					field : 'valid',
					title : '是否有效',
					width : 70,
					formatter:function(value,row,index){  
      					if(value == 'T'){
      						return '启用';
      					}else if(value == 'F'){
      						return '停用';
      					}else{
      						return '';
      					}
                      }
				}, {
					field : 'addedTime',
					title : '新增时间',
					width : 160
				}, {
					field : 'addedName',
					title : '新增人',
					width : 60
				}, {
					field : 'lastModifTime',
					title : '最后修改时间',
					width : 160
				}, {
					field : 'lastModifName',
					title : '最后修改人',
					width : 90
				}  ] ],

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
function addMigration() {
	$("#migrationAdd_form").form('clear');
	$("#suffix").combobox('setValue','txt');
	$('#migrationAddDiv').window("open");
	$('#saveMigrationForm').show();
}

//toolbar 清空查询条件
function clearMigration() {
	$("#querySubmit").form('clear');
	$("#search_suffix").combobox('setValue','');
	$("#search_valid").combobox('setValue','');
}


// toolbar 启用停用
function openOrCloseMigration() {
	if (null == $('#migration_table_2').datagrid('getRows')) {
		$.messager.alert('提示信息', '请先新增一条迁移信息!', 'info');
		return false;
	}
	var rows = $('#migration_table_2').datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示信息', '请先选择一条迁移信息!', 'info');
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
										url : base+ "/migration/setValid.action",
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
												$("#migration_table_2").datagrid('reload');
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
function queryMigration() {
	var param = {
		"sqlTxt" : $("#search_sqlTxt").val().replace(/(^\s*)|(\s*$)/g, ""),
		"comment" : $("#search_comment").val().replace(/(^\s*)|(\s*$)/g, ""),
		"suffix" : $("#search_suffix").combobox('getValue'),
		"valid" : $("#search_valid").combobox('getValue')
	};
	$("#migration_table_2").datagrid("load", param);

}

// 保存-新增
function submitMigrationForm() {
	// 检查新增框是否打开
	var isValidAdd = $('#migrationAdd_form').form('validate');
	if (!isValidAdd) {
		return false;
	}
	// 新增
	// 去两边空格
	var sqlTxt = $("#sqlTxt").val().replace(/(^\s*)|(\s*$)/g, "");
	var comment = $("#comment").val().replace(/(^\s*)|(\s*$)/g, "");
	var suffix = $("#suffix").combobox('getValue');
	$("#sqlTxt").val(sqlTxt);
	$("#comment").textbox('setValue',comment);
	// 防呆
	if (sqlTxt == "" || sqlTxt == null) {
		$.messager.alert("提示信息", "请输入sql文本！", "info");
		return false;
	}
	if (comment == "" || comment == null) {
		$.messager.alert("提示信息", "请输入备注信息！", "info");
		return false;
	}
	if (suffix != 'txt' && suffix != 'excel') {
		$.messager.alert("提示信息", "请选择后缀！", "info");
		return false;
	}
	var obj = setObjProteryByForm("migrationAdd_form", "form_");
	$.ajax({
		url : base + "/migration/insertMigration.action",
		type : "post",
		data : obj,
		cache : false,
		success : function(data) {
			if (!data.success) {
				$.messager.alert("提示信息", data.message, "info");
			} else {
				$.messager.alert("提示信息", "新增成功！", "success");
				$("#migration_table_2").datagrid('reload');
				closeMigrationForm();
			}
			$.messager.progress('close');
		},
		async : false
	});
}


// 关闭保存页面
function closeMigrationForm() {
	$("#migrationAdd_form").form('clear');
	$('#migrationAddDiv').window('close');	
}

