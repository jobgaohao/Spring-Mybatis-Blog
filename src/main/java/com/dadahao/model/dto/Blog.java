package com.dadahao.model.dto;

import java.util.Date;

/**
 * 对象
 * @author hao.gao
 *
 */
public class Blog {
 
	/**
	 * PKID
	 */
	public long pkid;
	
	/**
	 * 文章标题
	 */
	public String blogText;
	
	/**
	 * 文章链接
	 */
	public String blogHref;
	
	/**
	 * 博客内容
	 */
	public String blogContent;
	
	/**
	 * 博客摘要
	 */
	public String blogSummary;
	
	/**
	 * 备注
	 */
	public String remark;
	
	/**
	 * 是否有效
	 */
	public String valid;
	
	/**
	 * 添加时间
	 */
	public Date addedTime;
	
	/**
	 * 修改时间
	 */
	public Date modifiedTime;

	public long getPkid() {
		return pkid;
	}

	public void setPkid(long pkid) {
		this.pkid = pkid;
	}

	public String getBlogText() {
		return blogText;
	}

	public void setBlogText(String blogText) {
		this.blogText = blogText;
	}

	public String getBlogHref() {
		return blogHref;
	}

	public void setBlogHref(String blogHref) {
		this.blogHref = blogHref;
	}

	public String getBlogContent() {
		return blogContent;
	}

	public void setBlogContent(String blogContent) {
		this.blogContent = blogContent;
	}

	public String getBlogSummary() {
		return blogSummary;
	}

	public void setBlogSummary(String blogSummary) {
		this.blogSummary = blogSummary;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getValid() {
		return valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
	}

	public Date getAddedTime() {
		return addedTime;
	}

	public void setAddedTime(Date addedTime) {
		this.addedTime = addedTime;
	}

	public Date getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
	}
	
	@Override
	public String toString()
	{	
		String blogInfo="标题："+this.blogText+"  链接："+this.blogHref+" ";		
		return blogInfo;
	}
}
