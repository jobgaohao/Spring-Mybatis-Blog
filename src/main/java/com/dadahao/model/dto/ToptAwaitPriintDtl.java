package com.dadahao.model.dto;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


public class ToptAwaitPriintDtl implements Serializable{

    private Long pkid; // PKID

    private String awaitPriintDtlCode; // 待/实开票明细CODE

    private Long awaitPriintId; // 待/实开票ID

    private Long skuId; // SKUID
	
    private String category; // 货物名/服务名/品名
	
    private String specification; // 规格型号
	

    private BigDecimal unitPrice; // 单价
	

    private BigDecimal weight; // 重量/数量

    private String unit; // 单位

    private BigDecimal noTaxAmt; // 金额(不含税)

    private BigDecimal taxLimit; // 税额

    private BigDecimal taxRate; // 税率
	
    private BigDecimal withTaxAmt; // 金额(含税)

    private BigDecimal auditedTotAmt; // 已核销金额小计

    private Long addedBy; // 新增者

    private String addedName; // 新增者名称

    private Date addedTime; // 新增时间

    private Long lastModifiedBy; // 最后修改者

    private String lastModifiedName; // 最后修改者名称

    private Date lastModifiedTime; // 最后修改时间

    private String lastModifiedIp; // 最后修改IP

    private String valid; // 是否有效
	
	private String orderCode;//销售订单号
	

	private String applyCode;//申请单号

    private String printInvoiceCode;//打印发票号


    public String getPrintInvoiceCode() {
        return printInvoiceCode;
    }

    public void setPrintInvoiceCode(String printInvoiceCode) {
        this.printInvoiceCode = printInvoiceCode;
    }

    /**
	 * @return the applyCode
	 */
	public String getApplyCode() {
		return applyCode;
	}

	/**
	 * @param applyCode the applyCode to set
	 */
	public void setApplyCode(String applyCode) {
		this.applyCode = applyCode;
	}

	public Long getPkid() {
        return pkid;
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

	public void setPkid(Long pkid) {
        this.pkid = pkid;
    }

    public String getAwaitPriintDtlCode() {
        return awaitPriintDtlCode;
    }

    public void setAwaitPriintDtlCode(String awaitPriintDtlCode) {
        this.awaitPriintDtlCode = awaitPriintDtlCode;
    }

    public Long getAwaitPriintId() {
        return awaitPriintId;
    }

    public void setAwaitPriintId(Long awaitPriintId) {
        this.awaitPriintId = awaitPriintId;
    }

    public Long getSkuId() {
        return skuId;
    }

    public void setSkuId(Long skuId) {
        this.skuId = skuId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
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

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public BigDecimal getNoTaxAmt() {
        return noTaxAmt;
    }

    public void setNoTaxAmt(BigDecimal noTaxAmt) {
        this.noTaxAmt = noTaxAmt;
    }

    public BigDecimal getTaxLimit() {
        return taxLimit;
    }

    public void setTaxLimit(BigDecimal taxLimit) {
        this.taxLimit = taxLimit;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }

    public BigDecimal getWithTaxAmt() {
        return withTaxAmt;
    }

    public void setWithTaxAmt(BigDecimal withTaxAmt) {
        this.withTaxAmt = withTaxAmt;
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
}