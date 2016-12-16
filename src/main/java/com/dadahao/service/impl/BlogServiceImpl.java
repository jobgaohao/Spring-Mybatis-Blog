package com.dadahao.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dadahao.mapper.IBlog;
import com.dadahao.model.base.BlogBo;
import com.dadahao.model.dto.Blog;
import com.dadahao.service.BlogService;
import com.dadahao.spider.ExtractService;
import com.dadahao.spider.LinkTypeData;
import com.dadahao.spider.Rule;


@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	private IBlog iblog;
	@Autowired
	private ExtractService spiderService;
	
	
	
	/**
	 * 新增博客
	 * @param blog
	 * @return
	 */
	@Override
	public boolean Add(Blog blog)
	{
		return iblog.insertBlog(blog)>0?true:false;		
	}
	
	/**
	 * 修改博客
	 * @param blog
	 * @return
	 */
	@Override
	public boolean Modify(Blog blog)
	{
		return iblog.updateBlog(blog)>0?true:false;	
	}
	
	/**
	 * 查询博客
	 * @param bo
	 * @return
	 */
	@Override
	public List<Blog> getBlogs(BlogBo bo)
	{
		try {
			return iblog.getBlogs(bo);
		} catch (Exception e) {
			// TODO: handle exception
			String mes=e.getMessage();
			return null;
		}		
	}
	
	/**
	 * 导出博客
	 * @param blogBo
	 * @return
	 */
	@Override
	public List<Blog> exportBlogs(BlogBo blogBo)
	{
		try {
			return iblog.exportBlogs(blogBo);
		} catch (Exception e) {
			// TODO: handle exception
			String mes=e.getMessage();
			return null;
		}		
	}
	
	
	
	/**
	 * 查询数量
	 */
	@Override
	public int queryBlogCount(BlogBo bo)
	{
		return iblog.queryBlogCount(bo);
	}
	
	/**
	 * 抓取博客
	 */
	@Override
	public boolean grabBlog()
	{
		Blog blog=new Blog();	
		Rule rule=new Rule(
				"http://www.cnblogs.com",
				new String[]{},new String[]{},
				"div#post_list div.post_item", 
				Rule.SELECTION, 
				Rule.GET);
		List<LinkTypeData> extracts=spiderService.extractCnblog(rule);
		for (LinkTypeData linkTypeData : extracts) {
			blog=new Blog();
			blog.blogHref=linkTypeData.getLinkHref();
			blog.blogSummary=linkTypeData.getSummary();
			blog.blogContent=linkTypeData.getContent();
			blog.blogText=linkTypeData.getLinkText();
			blog.addedTime=new Date();
			blog.modifiedTime=new Date();
			blog.remark="  ";
			blog.valid="T";
			boolean b= Add(blog);			
		}
		return true;
	}
}
