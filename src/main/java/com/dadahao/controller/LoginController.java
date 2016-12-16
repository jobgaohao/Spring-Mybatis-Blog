package com.dadahao.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.dadahao.model.base.LoginBo;
import com.dadahao.model.form.QueryResult;

@Controller
@RequestMapping("/login")
public class LoginController {

	@RequestMapping("/doLogin")
	private ModelAndView doLogin()
	{
		return new ModelAndView("/blog/Login");
	}
	
	@RequestMapping(value="/login",produces="application/json;charset=UTF-8")
	@ResponseBody
	private QueryResult login(HttpSession session,@ModelAttribute LoginBo loginBo)
	{
		QueryResult queryResult=new QueryResult();
		queryResult.setResult("0");
		
		if(loginBo!=null){
			String uid=loginBo.getUserID();
			String pwd=loginBo.getPwd();
			if(uid.equals("admin")&&pwd.equals("123456")){
				session.setAttribute("loginInfo",loginBo);
				queryResult.setResult("/blog/getBlogs.action");
			}
		}
		return queryResult;
	}
	
	@RequestMapping(value="/logout")
	public String logout(HttpSession session) 
	{
		session.invalidate();//清楚session
		return "redirect:doLogin.action";
	}
}
