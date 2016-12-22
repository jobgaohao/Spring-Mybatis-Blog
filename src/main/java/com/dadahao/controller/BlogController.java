package com.dadahao.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.dadahao.common.util.PoiUtil;
import com.dadahao.model.base.BlogBo;
import com.dadahao.model.base.LoginBo;
import com.dadahao.model.dto.Blog;
import com.dadahao.model.dto.ToptAwaitActualPriint;
import com.dadahao.model.form.AwaitPrintInvoiceQueryForm;
import com.dadahao.model.form.QueryResult;
import com.dadahao.service.BlogService;
import com.sun.jdi.Method;




@Controller
@RequestMapping("/blog")
public class BlogController {

	@Resource
	private BlogService blogService;
	
	@Resource
	private PoiUtil poiUtil;
	
	/**
	 * 获取博客View
	 * @param blogBo
	 * @return
	 */
	@RequestMapping("/getBlogs")
	private ModelAndView getBlogs(HttpSession session)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();		
		resultMap.put("Title", "SrpingMVC Blog");
		resultMap.put("loginUname",((LoginBo)session.getAttribute("loginInfo")).getUserID());
		return new ModelAndView("/blog/blogList",resultMap);
	}
	
	/**
	 * 获取博客View Data
	 * @param blogBo
	 * @return
	 */
	@RequestMapping("/getBlogsList")
	@ResponseBody
	public Map<String,Object> getBlogsList(@ModelAttribute BlogBo blogBo)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();				
		int total =blogService.queryBlogCount(blogBo);//获取总行数
		List<Blog> billList = blogService.getBlogs(blogBo);//获取集合
		resultMap.put("rows",billList);
		resultMap.put("total", total);
		return resultMap;
	}
	
	/**
	 * 获取博客
	 * @param blogBo
	 * @return
	 */
	@RequestMapping(value="/getBlog",produces="application/json;charset=UTF-8")
	@ResponseBody
	public Blog getBlog(@ModelAttribute BlogBo blogBo)
	{
		Blog blog=new Blog();
		List<Blog> billList = blogService.getBlogs(blogBo);//获取集合
	    if(billList!=null&&billList.get(0)!=null)
	    {
	    	blog=billList.get(0);
	    }
		return blog;
	}
	
	/**
	 * 抓取博客
	 * @return
	 */
	@RequestMapping(value="/grabBlog",produces="application/json;charset=UTF-8")
	@ResponseBody
	public QueryResult grabBlog()
	{
		QueryResult queryResult=new QueryResult();
		boolean b= blogService.grabBlog();
		queryResult.setResult(b==true?"1":"0");		
		return queryResult;
	}
	
	/**
	 * 导出excel
	 */
	@RequestMapping("/exportBlog")
	public void exportBlog(@ModelAttribute BlogBo blogBo,
			HttpServletRequest request,
			HttpServletResponse response)
	{
		List<Blog> blogList=blogService.exportBlogs(blogBo);
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFCellStyle columnTopStyle=poiUtil.getColumnTopStyle(workbook);
		HSSFSheet sheet=workbook.createSheet();
		//标题列
		final String[] title={"博客标题","博客链接","内容简介","发布简介","备注","添加时间","修改时间"};
		if(null!=blogList&&blogList.size()>0)
		{
			//表头
			HSSFRow row=sheet.createRow(0);
			for (int i = 0; i < title.length; i++)
			{
			   HSSFCell cellTitle=row.createCell(i);
			   cellTitle.setCellStyle(columnTopStyle);
			   cellTitle.setCellValue(title[i]);
			   sheet.setColumnWidth(i, 20 * 256); 
			}
			
			int index=1;
			for (Blog blog : blogList) {
				HSSFRow rowItem=sheet.createRow(index);
				poiUtil.createCell(rowItem, 0, blog.getBlogText());
				poiUtil.createCell(rowItem, 1, blog.getBlogHref());
				poiUtil.createCell(rowItem, 2, blog.getBlogContent());
				poiUtil.createCell(rowItem, 3, blog.getBlogSummary());
				poiUtil.createCell(rowItem, 4, blog.getRemark());
				poiUtil.createCell(rowItem, 5, com.dadahao.common.util.DateUtil.formatDate(blog.getAddedTime(), com.dadahao.common.util.DateUtil.DEFAULT_DATE_FORMAT));
				poiUtil.createCell(rowItem, 6, com.dadahao.common.util.DateUtil.formatDate(blog.getModifiedTime(), com.dadahao.common.util.DateUtil.DEFAULT_DATE_FORMAT));
			    index++;
			}
			poiUtil.exportXslFile(workbook, "博客列表", response);
		}
	}

	/**
	 * 删除
	 * @return
	 */
	@RequestMapping(value="/delBlog",produces="application/json;charset=UTF-8")
	@ResponseBody
	public QueryResult delBlog(@ModelAttribute BlogBo blogBo)
    {
		QueryResult queryResult=new QueryResult();
		Blog blog=new Blog();
		blog.setPkid(blogBo.getPkid());
		blog.setValid("F");
		boolean b=blogService.Modify(blog);
		queryResult.setResult(b==true?"1":"0");
		return queryResult;
    }
	
	/**
	 * 上传文件
	 * @return
	 */
	@RequestMapping(value="/doUpload",produces="application/json;charset=UTF-8")
	@ResponseBody
	public QueryResult uploadFile(@RequestParam(value="fileUploda",required = false) MultipartFile file,
			HttpServletRequest request)
	{
		QueryResult queryResult=new QueryResult();
		boolean b=false;
		try {
			if(file!=null&&file.getSize()>0){
				//上传
				String path="D:\\upload\\";//;request.getSession().getServletContext().getRealPath("upload");
				String fileName=file.getOriginalFilename();
				File targetFile=new File(path,fileName);
				if(!targetFile.exists()){
					targetFile.mkdirs();
				}
				file.transferTo(targetFile);
				b=true;
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		queryResult.setResult(b==true?"1":"0");
		return queryResult;
	}
	
	
	/**
	 * 修改
	 * fileUploda:file的name
	 * @param blog
	 * @return
	 */
	@RequestMapping(value="/modifyBlog",produces="application/json;charset=UTF-8")
	@ResponseBody
	public QueryResult modifyBlog(@ModelAttribute Blog blog)
	{		
		QueryResult queryResult=new QueryResult();
		boolean b=false;
		try {			
		    b=blogService.Modify(blog);			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		queryResult.setResult(b==true?"1":"0");
		return queryResult;
	}
	
	
	
}
