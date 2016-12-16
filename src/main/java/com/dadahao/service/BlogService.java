package com.dadahao.service;

import java.util.List;

import com.dadahao.model.base.BlogBo;
import com.dadahao.model.dto.Blog;

public interface BlogService {

	/**
	 * 添加
	 * @param blog
	 * @return
	 */
	boolean Add(Blog blog);
	
	/**
	 * 修改
	 * @param blog
	 * @return
	 */
	boolean Modify(Blog blog);
	
	/**
	 * 查询
	 * @param blogBo
	 * @return
	 */
	List<Blog> getBlogs(BlogBo blogBo);
	
	/**
	 * 导出博客
	 * @param blogBo
	 * @return
	 */
	List<Blog> exportBlogs(BlogBo blogBo);
	
	/**
	 * 查询数量
	 * @param blogBo
	 * @return
	 */
	int queryBlogCount(BlogBo blogBo);
	
	/**
	 * 抓取博客
	 * @return
	 */
	boolean grabBlog();
}
