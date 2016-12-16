package com.dadahao.model.base;

public class BaseBo {
    //操作表示 true成功 false 失败。
    private boolean optFlag = true;

    /**
     * 起始页
     */
    private int     start;

    /**
     * 页数
     */
    private int     page    = 1;

    /**
     * 每页条数
     */
    private int     rows    = 10;

    //导出标识 all全部信息 page当前页面
    private String  exportFlag;

    public String getExportFlag() {
        return exportFlag;
    }

    public void setExportFlag(String exportFlag) {
        this.exportFlag = exportFlag;
    }

    public boolean isOptFlag() {
        return optFlag;
    }

    public void setOptFlag(boolean optFlag) {
        this.optFlag = optFlag;
    }

    final public int getEnd() {
        return this.start + this.rows;
    }

    public int getStart() {
        start = (this.getPage() - 1) * this.getRows();
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getPage() {
        if (page < 1) {
            page = 1;
        }
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRows() {
        if (rows < 0) {
            rows = 10;
        }
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

}
