package com.dadahao.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dadahao.mapper.QueryDataMapper;
import com.dadahao.model.dto.ToptAwaitActualPriint;
import com.dadahao.model.form.AwaitPrintInvoiceQueryForm;
import com.dadahao.service.QueryDataService;

@Service
public class QueryDataServiceImpl implements QueryDataService{
	
	@Autowired
	private QueryDataMapper queryDataMapper;
	@Override
	public List<ToptAwaitActualPriint> queryForAwaitPrintInfoList(AwaitPrintInvoiceQueryForm form) {
		return queryDataMapper.queryForAwaitPrintInfoList(form);
	}
	

}
