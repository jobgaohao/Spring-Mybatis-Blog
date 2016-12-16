package com.dadahao.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.dadahao.model.dto.ToptAwaitActualPriint;
import com.dadahao.model.form.AwaitPrintInvoiceQueryForm;
import com.dadahao.service.QueryDataService;

@Controller
@RequestMapping("/queryData")
public class QueryDataController {
	
	@Resource
	private QueryDataService queryDataService;
	
	@RequestMapping("/query")
	private ModelAndView  showDataInfo(){
		Map<String, Object> map = new HashMap<String, Object>();
		AwaitPrintInvoiceQueryForm form = new AwaitPrintInvoiceQueryForm();
		List<ToptAwaitActualPriint> list = queryDataService.queryForAwaitPrintInfoList(form);
		map.put("toptAwaitActualPriint", list.get(0));
		return new ModelAndView("/queryData",map);
	}
}
