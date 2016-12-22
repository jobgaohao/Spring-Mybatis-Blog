<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>${Title}</title>
		<#include "/common/common.ftl" >
		<#include "/common/commonJs.ftl">
		<#include "/common/commonCss.ftl">
    <script type="text/javascript" src="${base}/statics/js/blog/blogList.js" type="text/javascript"></script>
</head>
<body>
   <div class="easyui-layout" fit="true">
         <form id="searchForm" method="post" >
              <table >
                 <tr>
                   <td>新增日期开始:</td>
				   <td>
				           <input id="addDateBegin" class="easyui-datebox main-enter-search" editable="false" type="text" style="width:92px;">				           
				   </td>
				   <td>新增日期结束:</td>
				   <td>
				           <input id="addDateEnd" class="easyui-datebox main-enter-search" editable="false" type="text" style="width:92px;">				           
				   </td>
				   <td>博客标题：</td>
				   <td>
				         <input id="blogText" name="blogText"  class="easyui-textbox main-enter-search trim_easyuiinput" type="text" style="width: 100px;">
				   </td>
                   <td>
                   		<a id="payment_btn_serach" data-options="iconCls:'icon-search'"  class="easyui-linkbutton" style="float:left; width:60px; height:22px;margin-right:10px">查询</a>
                   		<a id="payment_btn_export" data-options="iconCls:'icon-print'"  class="easyui-linkbutton" style="float:left; width:60px; height:22px;margin-right:10px">导出</a>
               	 	    <a id="payment_btn_grab" data-options="iconCls:'icon-reload'"  class="easyui-linkbutton" style="float:left; width:60px; height:22px;margin-right:10px">抓取</a>
               	 	</td>
               	 	<td>
               	 	<div style="margin-left:100%">
               	 	   <a id="loginOut"  class="easyui-linkbutton" style="float:left; width:160px; height:22px;margin-right:10px">${loginUname} 退出</a>
               	 	</div>
               	 	</td>
                 </tr>
               </table>
          </form>
          <div id="payment_search_div" data-options="fit:true" style="height:85%;">           
        	<table id="payment_search_table" class="easyui-datagrid">
		    </table> 
		</div>
     </div>
      <div id="editBlog" title="编辑博客" modal="true" class="easyui-dialog zg_box" closed="true" style="width:480px;">
            <table style="padding:10px">
                <tr>
                    <th align="right">博客标题：</th>
                    <td><input id="inputBlogText" name="inputBlogText" class="easyui-textbox" type="text" style="width: 300px;" maxlength="50">
                        <span style="color:red">*</span>
                    </td>                                        
                </tr>
                <tr>
                    <th align="right">博客链接：</th>
                    <td><input id="inputBlogHref" name="inputBlogHref" class="easyui-textbox" type="text" style="width: 300px;" maxlength="50">
                         <span style="color:red">*</span>
                    </td>                                        
                </tr>
                <tr>
                    <th align="right">博客内容：</th>
                    <td><input id="inputBlogContent" name="inputBlogContent" class="easyui-textbox" type="text" style="width: 300px;height:50px;" maxlength="800"></td>                                        
                </tr>
                <tr>
                    <th align="right">博客摘要：</th>
                    <td><input id="inputBlogSummary" name="inputBlogSummary" class="easyui-textbox" type="text" style="width: 300px;height:50px;" maxlength="800"></td>                                        
                </tr>          
                <tr>
                    <th align="right">备注：</th>
                    <td><input id="inputRemark" name="inputRemark" class="easyui-textbox" type="text" style="width: 300px;height:50px;" maxlength="800" maxlength="4"></td>
                </tr>
                <tr>
                    <th align="right">附件：</th>
                    <td>
                       <input id="fileUploda"  name="fileUploda" type="file" style="width:260px;" >
                    </td>
                </tr>  
                <tr>
                    <th></th>
                    <td><span style="color:red">上传png文件</span></td>
                </tr>            
                <tr>
                    <th></th>
                    <td>
            <input type="hidden" id="hidden_pkid">
            <a href="javascript:void(0);" id="btn_Add_save" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" >保存</a>
            <a href="javascript:void(0);" id="btn_Add_cancle" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" >取消</a>
                    </td>
                </tr>
            </table>  
    </div>
</body>
</html>
