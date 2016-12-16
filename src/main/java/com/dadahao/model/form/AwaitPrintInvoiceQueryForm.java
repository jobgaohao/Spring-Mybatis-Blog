package com.dadahao.model.form;


import java.util.List;

import org.springframework.util.StringUtils;

import com.dadahao.model.base.BaseBo;

public class AwaitPrintInvoiceQueryForm extends BaseBo{

	private String customerId;//客户抬头id
	
	private String customerName;//客户抬头
	
	private int orgTitleId;//所属公司

	private String printInvoiceCodeStart;//发票开始号
	
	private String printInvoiceCodeEnd;//发票截止号
	
	private String orderCode;//销售订单号
	
	private List<Integer> invoiceType;//票据类型
	
	private List<Integer> invoiceStatus;//开票状态
	
	private List<Integer> sysFrom;//票据来源
	
	private List<Integer> deliveryType;//寄送方式

	private List<Integer> departmentIds;//销售部门

	private String printorTimeStart;//开票起始日期

	private String printorTimeEnd;//开票结束日期
	
	private int pkid;//主键id
	
	private String pkIds;//前台勾选的pkids
	
	private List<Integer> pkIdLists;//转换成pkIds集合
	
	/**
	 * @return the pkIds
	 */
	public String getPkIds() {
		return pkIds;
	}

	/**
	 * @param pkIds the pkIds to set
	 */
	public void setPkIds(String pkIds) {
		this.pkIds = pkIds;
	}

	/**
	 * @return the pkIdLists
	 */
	public List<Integer> getPkIdLists() {
		return pkIdLists;
	}

	/**
	 * @param pkIdLists the pkIdLists to set
	 */
	public void setPkIdLists(List<Integer> pkIdLists) {
		this.pkIdLists = pkIdLists;
	}

	private List<Integer> redStatus;//被红冲状态

	private List<Long> awaitIds; //多个待开主表id

	/**
	 * @return the pkid
	 */
	public int getPkid() {
		return pkid;
	}

	/**
	 * @param pkid the pkid to set
	 */
	public void setPkid(int pkid) {
		this.pkid = pkid;
	}

	/**
	 * @return the customerId
	 */
	public String getCustomerId() {
		return customerId;
	}

	/**
	 * @param customerId the customerId to set
	 */
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	/**
	 * @return the customerName
	 */
	public String getCustomerName() {
		return customerName;
	}

	/**
	 * @param customerName the customerName to set
	 */
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	/**
	 * @return the printInvoiceCodeStart
	 */
	public String getPrintInvoiceCodeStart() {
		return printInvoiceCodeStart;
	}

	/**
	 * @param printInvoiceCodeStart the printInvoiceCodeStart to set
	 */
	public void setPrintInvoiceCodeStart(String printInvoiceCodeStart) {
		this.printInvoiceCodeStart = printInvoiceCodeStart;
	}

	/**
	 * @return the printInvoiceCodeEnd
	 */
	public String getPrintInvoiceCodeEnd() {
		return printInvoiceCodeEnd;
	}

	/**
	 * @param printInvoiceCodeEnd the printInvoiceCodeEnd to set
	 */
	public void setPrintInvoiceCodeEnd(String printInvoiceCodeEnd) {
		this.printInvoiceCodeEnd = printInvoiceCodeEnd;
	}

	/**
	 * @return the orderCode
	 */
	public String getOrderCode() {
		return orderCode;
	}

	/**
	 * @param orderCode the orderCode to set
	 */
	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	/**
	 * @return the invoiceType
	 */
	public List<Integer> getInvoiceType() {
		return invoiceType;
	}

	/**
	 * @param invoiceType the invoiceType to set
	 */
	public void setInvoiceType(List<Integer> invoiceType) {
		this.invoiceType = invoiceType;
	}

	/**
	 * @return the invoiceStatus
	 */
	public List<Integer> getInvoiceStatus() {
		return invoiceStatus;
	}

	/**
	 * @param invoiceStatus the invoiceStatus to set
	 */
	public void setInvoiceStatus(List<Integer> invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}

	/**
	 * @return the sysFrom
	 */
	public List<Integer> getSysFrom() {
		return sysFrom;
	}

	/**
	 * @param sysFrom the sysFrom to set
	 */
	public void setSysFrom(List<Integer> sysFrom) {
		this.sysFrom = sysFrom;
	}

	/**
	 * @return the deliveryType
	 */
	public List<Integer> getDeliveryType() {
		return deliveryType;
	}

	/**
	 * @param deliveryType the deliveryType to set
	 */
	public void setDeliveryType(List<Integer> deliveryType) {
		this.deliveryType = deliveryType;
	}

	/**
	 * @return the orgTitleId
	 */
	public int getOrgTitleId() {
		return orgTitleId;
	}

	/**
	 * @param orgTitleId the orgTitleId to set
	 */
	public void setOrgTitleId(int orgTitleId) {
		this.orgTitleId = orgTitleId;
	}

	public List<Integer> getDepartmentIds() {
		return departmentIds;
	}

	public void setDepartmentIds(List<Integer> departmentIds) {
		this.departmentIds = departmentIds;
	}

	public String getPrintorTimeStart() {
		if(!StringUtils.isEmpty(printorTimeStart))
		return printorTimeStart+" 00:00:00";
		return null;
	}

	public void setPrintorTimeStart(String printorTimeStart) {
		this.printorTimeStart = printorTimeStart;
	}

	public String getPrintorTimeEnd() {
		if(!StringUtils.isEmpty(printorTimeEnd))
		return printorTimeEnd+" 23:59:59";
		return null;
	}

	public void setPrintorTimeEnd(String printorTimeEnd) {
		this.printorTimeEnd = printorTimeEnd;
	}

	public List<Integer> getRedStatus() {
		return redStatus;
	}

	public void setRedStatus(List<Integer> redStatus) {
		this.redStatus = redStatus;
	}

	public List<Long> getAwaitIds() {
		return awaitIds;
	}

	public void setAwaitIds(List<Long> awaitIds) {
		this.awaitIds = awaitIds;
	}
}
