$(function () {
	
	initData();
});

function initData() {
	
	$(function () {

		$('#spot_datagrid_list').datagrid({ 
			pagination:true,
			fit:true,
			fitColumns:true,  //自适应单元格的大小做到自适应 已防止出现滚动
		    url:base+'/resourceManager/getSpotByZydId.action',  
		    queryParams:{"zydId":$("#spotzydId").val(), "deptsId":$("#department").val(), "cityId":$("#spotcityId").val()},
		    columns:[[    
		       
		        { field: 'categoryName', title: "品名", width: 100, align:'center'},
		        { field: 'specificationName', title: "规格", width: 100, align:'center'},
		        { field: 'materialName', title: "材质", width: 100, align:'center'},
		        { field: 'price', title: "价格", width: 100, align:'center'},
		        { field: 'storage', title: "仓库", width: 100, align:'center'},
		        { field: 'factoryName', title: "产地", width: 100, align:'center'},
		        { field: 'remark', title: "备注", width: 150, align:'center'},
		        
		    ]]    
		}); 
	}); 
	
}