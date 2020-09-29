import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import {  WorkBook, read, utils, write, readFile } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
	
	constructor() {
	}
  
	static toExportFileName(excelFileName: string): string {
	  return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
	}
  
	public exportAsExcelFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
		XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
	}


	public convertExcelToJson(file){
		let reader = new FileReader();
		let workbookkk
		let XL_row_object
		let json_object
		let jsonData = []
		reader.readAsBinaryString(file)	
		reader.onload = function(){				
			let data = reader.result;
			workbookkk=read(data,{type: 'binary'})				
			workbookkk.SheetNames.some(function(index) {								
				XL_row_object = utils.sheet_to_json(workbookkk.Sheets[index])					
				jsonData.push(utils.sheet_to_json(workbookkk.Sheets[index]))	
				return		
			})
		}	
		
		return jsonData
		
	}
		
}
