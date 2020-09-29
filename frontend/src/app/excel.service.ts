import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import {  WorkBook, read, utils, write, readFile } from 'xlsx';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
	
	constructor() {
	}
	
	private JSON = new Subject<any>();

	static toExportFileName(excelFileName: string): string {
	  return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
	}
  
	public exportAsExcelFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
		XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
	}


	public convertExcelToJson(file){
		const reader = new FileReader()		
		reader.onload = (event) => {
		const data = reader.result;
		let workBook = XLSX.read(data, { type: 'binary' });
		let jsonData = workBook.SheetNames.reduce((initial, name) => {
			const sheet = workBook.Sheets[name];
			initial[name] = XLSX.utils.sheet_to_json(sheet);
			return initial;
		}, {});
		const dataString = JSON.stringify(jsonData);
		this.JSON.next( jsonData)	
		}
		reader.readAsBinaryString(file);
	}

	getExcellData(){
		return this.JSON.asObservable();
	}
		
}
