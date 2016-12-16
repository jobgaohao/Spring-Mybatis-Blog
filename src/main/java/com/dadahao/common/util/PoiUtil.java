package com.dadahao.common.util;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.stereotype.Service;

/*
 * POI操作Excel
 */
@Service
public class PoiUtil {

	/**
	* 创建excel表格的列
	* 
	* @param row
	* @param cellNum
	* @param value
	*/
	public  void createCell(HSSFRow row,
			int cellNum,
			Object value) {
		if (row != null) {
			HSSFCell cell = row.createCell(cellNum);
			cell.setCellValue(new HSSFRichTextString(value != null ? String.valueOf(value) : ""));
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
		}
	}

	/**
	 * 导出xsl文件
	 * @param wb
	 * @return
	 */
	public  void exportXslFile(HSSFWorkbook wb,
			String partFileName,
			HttpServletResponse response) {
		if (wb != null) {
			try {
				String fileName = "Excel-" + partFileName + "-"
						+ String.valueOf(new SimpleDateFormat("yyyyMMdd").format(new Date())) + ".xls";
				String headStr = "attachment; filename=\"" + new String(fileName.getBytes("gb2312"), "ISO8859-1")
						+ "\"";
				response.setContentType("APPLICATION/OCTET-STREAM");
				response.setHeader("Content-Disposition", headStr);
				OutputStream out = response.getOutputStream();
				wb.write(out);
			} catch (IOException e) {
				//				LOG.error(e);
			}
		}
	}

	/*
	 * 列头单元格样式 
	 */
	public  HSSFCellStyle getColumnTopStyle(HSSFWorkbook workbook) {
		// 设置字体  
        HSSFFont font = workbook.createFont();
		//设置字体大小  
        font.setFontHeightInPoints((short) 11);
		//字体加粗  
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		//设置字体名字   
        font.setFontName("Courier New");
		//设置样式;   
        HSSFCellStyle style = workbook.createCellStyle(); 
		//设置底边框;   
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		//设置底边框颜色;    
        style.setBottomBorderColor(HSSFColor.BLACK.index);
		//设置左边框;     
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		//设置左边框颜色;   
        style.setLeftBorderColor(HSSFColor.BLACK.index);
		//设置右边框;   
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		//设置右边框颜色;   
        style.setRightBorderColor(HSSFColor.BLACK.index);
		//设置顶边框;   
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		//设置顶边框颜色;    
        style.setTopBorderColor(HSSFColor.BLACK.index);
		//在样式用应用设置的字体;    
        style.setFont(font);
		//设置自动换行;   
        style.setWrapText(false);
		//设置水平对齐的样式为居中对齐;    
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		//设置垂直对齐的样式为居中对齐;   
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        return style;
   }
}
