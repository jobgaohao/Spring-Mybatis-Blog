package com.dadahao.model.base;

/**
 * 登陆Bo
 * @author hao.gao
 *
 */
public class LoginBo {
     
	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	/**
	 * 登陆名字
	 */
	 public String userID; 
	 
	 /**
	  * 密码
	  */
	 public String pwd;
}
