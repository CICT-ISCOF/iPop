import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { UtilityService } from '../../../others/utility.service'
import { ExcelService } from '../../../others/excel.service'
import { BulkService } from './bulk.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

	constructor(
		private UtilityService  : UtilityService,
		private ExcelService : ExcelService,
		private BulkService : BulkService
	) { 

		this.ExcelService.getExceltoJSONlData().subscribe(data => {			
			this.BulkService.storeBulk(this.type, { data: data } ).subscribe(data => {		
				this.noValidFIle = false		
				this.uploadError = false
				this.progressWIDTH = 100
				this.uploadFinished = true		
				this.isUploading = false		
			},
			error =>{
				this.progressWIDTH = 100
				this.uploadError = true
				this.UtilityService.setAlert('Something went wrong. Upload Failed','error')
			})
		})
	
	}

	
	subscription: Subscription
	public files: NgxFileDropEntry[] = [];
	isUploading = false
	tableFiles = []
	unUploadedFiles = []
	theme = localStorage.getItem('data-theme')	
	uploadError = false
	progressWIDTH = 0
	uploadFinished = false
	noValidFIle = false
	type = ''	
	types = ['cpdb','marriage','birth','death','inmigration','outmigration']
	 
	ngOnInit(): void {

	}

	

	public dropped(files: NgxFileDropEntry[]) {
		if (this.uploadFinished) {
			this.clearFiles()	
			this.unUploadedFiles = []
			this.uploadFinished = false		
		}
		this.files = files;
		for (const droppedFile of files) {	 
		
		  if (droppedFile.fileEntry.isFile) {
				const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
				fileEntry.file((file: File) => {
					this.tableFiles.push(file)					
				})
			} 
			else {				
				this.UtilityService.setAlert('directory is empty', 'error')
				this.files = []
				this.tableFiles.pop()				
			}
		}
	}

	readInputTypeFile(event){
		const files = event.target.files
		this.files = files;
		for (const droppedFile of files) {	 
			this.tableFiles.push(droppedFile)	
		}
	}

	triggerInput(){
		document.getElementById('fileUpload').click()
	}

	public fileOver(event){
		this.progressWIDTH = 0
	}
	 
	public fileLeave(event){
	}

	clearFiles(){
		this.files = [];
		this.tableFiles = []
		this.isUploading = false
		this.uploadError = false
		this.progressWIDTH = 0
		this.uploadFinished = false
		this.unUploadedFiles = []

	}

	checkIfXlsx(fileName){
		const fileExtension = fileName.split('.')	
		if(fileExtension[1] == 'xlsx' || fileExtension[1] == 'xls'){
			return false
		}
		return true		
	}

	removeItem(index){
		this.files.splice(index, 1)
		this.tableFiles.splice(index, 1)
		if(this.tableFiles.length == 0){
			this.clearFiles
		}
	}

	uploadFile(){			
		this.progressWIDTH = 0
		if(this.tableFiles.length != 0){
			this.isUploading = true			
			let data = {}
			let count
			let xlsFiles = 0
			for(let file in this.tableFiles){
				if(this.checkIfXlsx(this.tableFiles[file].name) == false){	
					this.ExcelService.convertExcelToJson(this.tableFiles[file])
					xlsFiles += 1
					setInterval(() => {
						if(this.progressWIDTH <= 90){
							this.progressWIDTH +=1
						}					
					}, 200)	
				}
				else{
					this.unUploadedFiles.push(this.tableFiles[file])				
				}
			}						
			if(xlsFiles == 0){
				this.noValidFIle = true
				this.progressWIDTH == 100
				this.uploadError = true
				this.uploadFinished = false
				this.UtilityService.setAlert('No valid files to upload`','error')
				this.isUploading = false		
				return
			}	
		}
		else{
			this.UtilityService.setAlert('No files to upload','error')
		}	
	}

}
