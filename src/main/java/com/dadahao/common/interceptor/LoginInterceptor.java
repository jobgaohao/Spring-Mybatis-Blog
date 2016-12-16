package com.dadahao.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.dadahao.model.base.LoginBo;

public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		String url=request.getRequestURI();
		
		HttpSession session=request.getSession();		
		if( null!=session.getAttribute("loginInfo"))
		{
			String userName=((LoginBo)session.getAttribute("loginInfo")).getUserID();
			
			if(!StringUtils.isEmpty(userName)){  
				return true;  
			}  
		}
		
        //不符合条件的，跳转到登录界面  
		request.getRequestDispatcher("/login/doLogin.action").forward(request, response);  		
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

}
