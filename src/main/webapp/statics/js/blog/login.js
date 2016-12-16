$(function() {	
	
	$("#inputUID").focus();
	
	
	
	$("#btn_login_login").bind("click",function(){
		doLogin();
	});

});



/**
 * 抓取数据
 */
var doLogin=function(){
	var uid=$("#inputUID").textbox("getValue");
	var pwd=$("#inputPwd").textbox("getValue");
	if($.trim(uid)=="" ){
	  $.messager.alert('提示信息', '请输入用户名', 'info');
	  return false;	
	}
	else if($.trim(pwd)==""){
	   $.messager.alert('提示信息', '请输入密码', 'info');
	   return false;	
	}
	
	var param = {
			'userID':uid,
			'pwd':pwd
	};
	
	MaskUtil.mask();
	$.ajax({
	 	url:base + "/login/login.action",
	 	type: 'POST',
	 	data:param,
	 	dataType: 'JSON',	 
	 	success: function(data){
	 		if(data.result!="0"){
	 		   window.location.href=base+data.result;			
			}
	 		else{
	 			$.messager.alert('提示信息', '登陆失败!', 'info');
	 		}
	 		MaskUtil.unmask();
	 	}
	 });   
}
