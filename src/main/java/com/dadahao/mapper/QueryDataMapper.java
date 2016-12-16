package com.dadahao.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.dadahao.model.dto.ToptAwaitActualPriint;
import com.dadahao.model.form.AwaitPrintInvoiceQueryForm;

@Component("queryDataMapper")
public interface QueryDataMapper {

	List<ToptAwaitActualPriint> queryForAwaitPrintInfoList(AwaitPrintInvoiceQueryForm form);

}
