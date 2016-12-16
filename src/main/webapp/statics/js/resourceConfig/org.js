var expnode = null;
var _org ={
		/*弹框*/
		init : function(){
			$('#org_window').window('open');
			_org.orgWin();
			$('#treeName').val("");
			$("#deptName").parent().find('a').removeClass("textbox-icon-disabled");
		},
		orgWin : function(){
			$('#orgTree').treegrid({
				height : 488,
				width : 488,
				rownumbers : false,
				animate : true,
				collapsible : true,
				loadMsg : '数据加载中...',
				singleSelect : false,
				url : base + '/deptRule/queryOrgByUserId.action',
				idField : 'pkid',
				treeField : 'orgName',
				showFooter : true,
				lines:true,
				toolbar:'#toolbar',
				columns : [ [ {
					title : '',
					field : 'orgName',
					width : 300
				}, ] ],
				onLoadSuccess : function(){
					if (expnode != null) {
			            expidx ++;
			            if (expidx < expnode.length-1) {
			                var node = $('#orgTree').treegrid('find', expnode[expidx]);
			                $('#orgTree').treegrid('expand', node.id);
			            }
			            else {
			                expnode = null;
			                expidx = 0;
			                var param = sourceId;
			                var node = $('#orgTree').treegrid('find', param);
			                $('#orgTree').treegrid('select', node.id);
			            }
			        }
					// 加载完成后，展开树的第一级节点
					$("#orgTree").treegrid('expand',0);
					$('#orgTree').treegrid('unselectAll');	
					
				},
				onBeforeExpand : function(row) {
					return true;
				},
				onExpand:function(){ // 主动定位
					var div_module = $("#cus1").find(".datagrid-body");
					var seleted_li = div_module.find('tr[class$="row-selected"]');
					if(seleted_li.length) {
						var height = $(seleted_li[0]).offset().top;
						var oenheight = $(div_module.find('tr')[0]).offset().top;
						div_module.scrollTop(height - oenheight);
					}
				},
				onDblClickRow : function(row){
					if(row.cNum > 0 || row.id == 0){//有子类目，展开
						$("#orgTree").treegrid('expand',row.id);
					}else{//无子类目，选择
						selectOrg(row);
						$('#org_window').window('close');
					}
				},
				
			});
		}
	}
//双击选择
function selectOrg(row){
	var pkid = row.pkid;
	var orgName = row.orgName;
	$('#deptName').textbox('setValue',orgName);
	$('#deptId').val(pkid);
	$('#org_window').window('close');
}
//搜索树
function searchTree(){
	$('#orgTree').treegrid('unselectAll');	
	var orgName = $("#treeName").val().replace(/(^\s*)|(\s*$)/g, "");
	if(orgName==null||orgName==""){
		return false;
	}
	$.ajax({
		url : base + "/deptRule/getTreeId.action",
		type : "post",
		data : {'orgName':orgName},
		cache : false,
		success : function(data) {
			if(data!=null){
				for(var i=0;i<data.rows.length;i++){
					$('#orgTree').treegrid('select', data.rows[i]);	
				}	
			}else{
				return false;
			}
		},
		async : false
	});
	
}
