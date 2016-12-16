<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>登录</title>
	<#include "/common/common.ftl" >
	<#include "/common/commonJs.ftl">
	<#include "/common/commonCss.ftl">
    <script type="text/javascript" src="${base}/statics/js/blog/login.js" type="text/javascript"></script>
</head>
<body>
   <div class="easyui-layout" fit="true">
          <div id="editBlog" title="登陆" modal="true" class="easyui-dialog zg_box"  style="width:350px;">
            <table style="padding:10px">
                <tr>
                    <th align="right">用户名：</th>
                    <td><input id="inputUID" name="inputUID" class="easyui-textbox" type="text" style="width: 200px;" maxlength="50">
                        <span style="color:red">*</span>
                    </td>                                        
                </tr>
                <tr>
                    <th align="right">密码：</th>
                    <td><input id="inputPwd" name="inputPwd" type="password"  class="easyui-textbox" type="text" style="width: 200px;" maxlength="50">
                         <span style="color:red">*</span>
                    </td>                                        
                </tr>
                <tr>
                    <th></th>
                    <td>           
                       <a href="javascript:void(0);" id="btn_login_login" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" >登陆</a>            
                    </td>
                </tr>
            </table>       
    </div>
   </div>
</body>
</html>
