package com.dadahao.model.base;

public class BlogBo extends BaseBo {
	/**
	 * pkid
	 */
	public long pkid;
	
	/**
	 * 博客标题
	 */
	public String blogText;
	
	
	/**
	 * 付款开始时间
	 */
	private String addDateBegin;
	
	
	/**
	 * 付款结束时间
	 */
	private String addDateEnd; 
	
	

	public String getAddDateBegin() {
		return addDateBegin;
	}

	public void setAddDateBegin(String addDateBegin) {
		this.addDateBegin = addDateBegin;
	}

	public String getAddDateEnd() {
		return addDateEnd;
	}

	public void setAddDateEnd(String addDateEnd) {
		this.addDateEnd = addDateEnd;
	}

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
}
