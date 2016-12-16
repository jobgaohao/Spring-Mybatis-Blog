package com.dadahao.mapper;

import java.util.List;

import com.dadahao.model.base.BlogBo;
import com.dadahao.model.dto.Blog;

public interface IBlog {
	
	/**
	 * 查询博客数量
	 * @param bo
	 * @return
	 */
	int queryBlogCount(BlogBo bo);
	
	/**
	 * 查询博客
	 * @param bo
	 * @return
	 */
	List<Blog> getBlogs(BlogBo bo);
	
	/**
	 * 导出博客
	 * @param bo
	 * @return
	 */
	List<Blog> exportBlogs(BlogBo bo);
	
	/**
	 * 添加博客
	 * @param bo
	 * @return
	 */
	int insertBlog(Blog bo);
	
	/**
	 * 修改博客
	 * @param bo
	 * @return
	 */
	int updateBlog(Blog bo);
	
	
}
