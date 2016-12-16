package com.dadahao.model.dto;

import java.math.BigDecimal;
import java.util.Date;



public class ToptAwaitActualPriint {
	
    private String printno; // 发票代码

    private String redNoticenrCode; // 红冲通知单号

    private String taxNo; // 纳税人识别号

    private String invoiceAddress; // 开票地址

    private String bankName; // 开户行

    private String accountNo; // 银行账号

    private String invoiceTelephone; // 开票电话

    private String contractOutCode; // 合同号

    private String remark; // 备注
	
    private BigDecimal totWeight; // 重量
	
    private BigDecimal totAmt; // 待/实开总金额

    private BigDecimal auditedTotAmt; // 已核总金额

    private Long addedBy; // 新增者

    private String addedName; // 新增者名称

    private Date addedTime; // 新增时间

    private Long lastModifiedBy; // 最后修改者

    private String lastModifiedName; // 最后修改者名称

    private Date lastModifiedTime; // 最后修改时间

    private String lastModifiedIp; // 最后修改IP

    private String valid; // 是否有效

    private Long pkid; // PKID

    private String awaitActualPrintCode; // 应开票CODE 规则：日期_PKID

    private Long orgTitleId; // 所属公司ID

    private Long oppoOrgTitleId; // 对方公司ID
	
    private String oppoOrgTitleName; // 对方公司名称
	
    private Long invoiceType; // 发票类型 增值税专用发票 增值税普通发票
//10 - 专用发票    20 - 普通发票 90 - 其它
	private String invoiceTypeName;
	
    private Long doctype; // 1 - 正常单据    2 - 红冲单据  3 - 折扣单据
	
    private Long invoiceStatus; // 发票状态(枚举)   10待开，20已打印，30打印错误，40作废，50取消
	
	 private String invoiceStatusName;
	
    private Long redStatus; //被红冲状态 10未被红冲 20部分被红冲 30全部被红冲 40红冲失败

    private Long departmentId; // 部门ID
	
    private String departmentName; // 部门名称

    private Long printorId; // 开票人ID

    private String printorName; // 开票人

    private Date printorTime; // 开票时间

    private String coreInvoiceCode; // 核心发票号

    private String printInvoiceCode; // 打印发票号
	
    private Long deliveryType; // 寄送方式
	
	private String deliveryTypeName; // 寄送方式
	
    private String sysfrom; // 所属系统
	
	private String sysfromName; // 所属系统
	
	private String returnStatus;//退票状态："0":未发起退票 ，"1":已发起退票
	
	private String loseStatus;//遗失状态："0":未发起遗失申请,"1":已发起遗失申请、
	
	/**
	 * @return the returnStatus
	 */
	public String getReturnStatus() {
		return returnStatus;
	}

	/**
	 * @param returnStatus the returnStatus to set
	 */
	public void setReturnStatus(String returnStatus) {
		this.returnStatus = returnStatus;
	}

	/**
	 * @return the loseStatus
	 */
	public String getLoseStatus() {
		return loseStatus;
	}

	/**
	 * @param loseStatus the loseStatus to set
	 */
	public void setLoseStatus(String loseStatus) {
		this.loseStatus = loseStatus;
	}

	/**
	 * @return the sysfrom
	 */
	public String getSysfrom() {
		return sysfrom;
	}

	/**
	 * @param sysfrom the sysfrom to set
	 */
	public void setSysfrom(String sysfrom) {
		this.sysfrom = sysfrom;
	}

	public String getPrintno() {
        return printno;
    }

    public void setPrintno(String printno) {
        this.printno = printno;
    }

    public String getRedNoticenrCode() {
        return redNoticenrCode;
    }

    public void setRedNoticenrCode(String redNoticenrCode) {
        this.redNoticenrCode = redNoticenrCode;
    }

    public String getTaxNo() {
        return taxNo;
    }

    public void setTaxNo(String taxNo) {
        this.taxNo = taxNo;
    }

    public String getInvoiceAddress() {
        return invoiceAddress;
    }

    public void setInvoiceAddress(String invoiceAddress) {
        this.invoiceAddress = invoiceAddress;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getInvoiceTelephone() {
        return invoiceTelephone;
    }

    public void setInvoiceTelephone(String invoiceTelephone) {
        this.invoiceTelephone = invoiceTelephone;
    }

    public String getContractOutCode() {
        return contractOutCode;
    }

    public void setContractOutCode(String contractOutCode) {
        this.contractOutCode = contractOutCode;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(Long addedBy) {
        this.addedBy = addedBy;
    }

    public String getAddedName() {
        return addedName;
    }

    public void setAddedName(String addedName) {
        this.addedName = addedName;
    }

    public Date getAddedTime() {
        return addedTime;
    }

    public void setAddedTime(Date addedTime) {
        this.addedTime = addedTime;
    }

    public Long getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(Long lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public String getLastModifiedName() {
        return lastModifiedName;
    }

    public void setLastModifiedName(String lastModifiedName) {
        this.lastModifiedName = lastModifiedName;
    }

    public String getLastModifiedIp() {
        return lastModifiedIp;
    }

    public void setLastModifiedIp(String lastModifiedIp) {
        this.lastModifiedIp = lastModifiedIp;
    }

    public String getValid() {
        return valid;
    }

    public void setValid(String valid) {
        this.valid = valid;
    }

    public Long getPkid() {
        return pkid;
    }

    public void setPkid(Long pkid) {
        this.pkid = pkid;
    }

    public String getAwaitActualPrintCode() {
        return awaitActualPrintCode;
    }

    public void setAwaitActualPrintCode(String awaitActualPrintCode) {
        this.awaitActualPrintCode = awaitActualPrintCode;
    }

    public Long getOrgTitleId() {
        return orgTitleId;
    }

    public void setOrgTitleId(Long orgTitleId) {
        this.orgTitleId = orgTitleId;
    }

    public Long getOppoOrgTitleId() {
        return oppoOrgTitleId;
    }

    public void setOppoOrgTitleId(Long oppoOrgTitleId) {
        this.oppoOrgTitleId = oppoOrgTitleId;
    }

    public String getOppoOrgTitleName() {
        return oppoOrgTitleName;
    }

    public void setOppoOrgTitleName(String oppoOrgTitleName) {
        this.oppoOrgTitleName = oppoOrgTitleName;
    }

    public Long getInvoiceType() {
        return invoiceType;
    }

    public void setInvoiceType(Long invoiceType) {
        this.invoiceType = invoiceType;
    }

    public Long getDoctype() {
        return doctype;
    }

    public void setDoctype(Long doctype) {
        this.doctype = doctype;
    }

    public Long getInvoiceStatus() {
        return invoiceStatus;
    }

    public void setInvoiceStatus(Long invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }


    public Long getPrintorId() {
        return printorId;
    }

    public void setPrintorId(Long printorId) {
        this.printorId = printorId;
    }

    public String getPrintorName() {
        return printorName;
    }

    public void setPrintorName(String printorName) {
        this.printorName = printorName;
    }

    public Date getPrintorTime() {
        return printorTime;
    }

    public void setPrintorTime(Date printorTime) {
        this.printorTime = printorTime;
    }

    public String getCoreInvoiceCode() {
        return coreInvoiceCode;
    }

    public void setCoreInvoiceCode(String coreInvoiceCode) {
        this.coreInvoiceCode = coreInvoiceCode;
    }

    public String getPrintInvoiceCode() {
        return printInvoiceCode;
    }

    public void setPrintInvoiceCode(String printInvoiceCode) {
        this.printInvoiceCode = printInvoiceCode;
    }

    public Long getRedStatus() {
        return redStatus;
    }

    public void setRedStatus(Long redStatus) {
        this.redStatus = redStatus;
    }

    public BigDecimal getTotWeight() {
        return totWeight;
    }

    public void setTotWeight(BigDecimal totWeight) {
        this.totWeight = totWeight;
    }

    public BigDecimal getTotAmt() {
        return totAmt;
    }

    public void setTotAmt(BigDecimal totAmt) {
        this.totAmt = totAmt;
    }

    public BigDecimal getAuditedTotAmt() {
        return auditedTotAmt;
    }

    public void setAuditedTotAmt(BigDecimal auditedTotAmt) {
        this.auditedTotAmt = auditedTotAmt;
    }

    public Date getLastModifiedTime() {
        return lastModifiedTime;
    }

    public void setLastModifiedTime(Date lastModifiedTime) {
        this.lastModifiedTime = lastModifiedTime;
    }

    public Long getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(Long deliveryType) {
        this.deliveryType = deliveryType;
    }

	/**
	 * @return the invoiceTypeName
	 */
	public String getInvoiceTypeName() {
		return invoiceTypeName;
	}

	/**
	 * @param invoiceTypeName the invoiceTypeName to set
	 */
	public void setInvoiceTypeName(String invoiceTypeName) {
		this.invoiceTypeName = invoiceTypeName;
	}

	/**
	 * @return the invoiceStatusName
	 */
	public String getInvoiceStatusName() {
		return invoiceStatusName;
	}

	/**
	 * @param invoiceStatusName the invoiceStatusName to set
	 */
	public void setInvoiceStatusName(String invoiceStatusName) {
		this.invoiceStatusName = invoiceStatusName;
	}

	/**
	 * @return the deliveryTypeName
	 */
	public String getDeliveryTypeName() {
		return deliveryTypeName;
	}

	/**
	 * @param deliveryTypeName the deliveryTypeName to set
	 */
	public void setDeliveryTypeName(String deliveryTypeName) {
		this.deliveryTypeName = deliveryTypeName;
	}

	/**
	 * @return the sysfromName
	 */
	public String getSysfromName() {
		return sysfromName;
	}

	/**
	 * @param sysfromName the sysfromName to set
	 */
	public void setSysfromName(String sysfromName) {
		this.sysfromName = sysfromName;
	}
}