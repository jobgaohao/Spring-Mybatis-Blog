package com.dadahao.service;

import java.util.List;

import com.dadahao.model.dto.ToptAwaitActualPriint;
import com.dadahao.model.form.AwaitPrintInvoiceQueryForm;

public interface QueryDataService {
	
	List<ToptAwaitActualPriint> queryForAwaitPrintInfoList(AwaitPrintInvoiceQueryForm form);
}
