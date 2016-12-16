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
         <form id="searchForm" method="post">
              <table>
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
                 </tr>
               </table>
          </form>
          <div id="payment_search_div" data-options="fit:true" style="height:85%;">           
        	<table id="payment_search_table" class="easyui-datagrid">
		    </table> 
		</div>
     </div>
</body>
</html>
