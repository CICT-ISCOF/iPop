import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { UtilityService } from '../../../utility.service'
import { ExcelService } from '../../../excel.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

	constructor(
		private UtilityService  : UtilityService,
		private ExcelService : ExcelService
	) { }

	public files: NgxFileDropEntry[] = [];
	isUploading = false
	tableFiles = []
	unUploadedFiles = []
	theme = localStorage.getItem('data-theme')

	ngOnInit(): void {

	}

	public dropped(files: NgxFileDropEntry[]) {
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

	triggerInput(){
		document.getElementById('fileUpload').click()
	}

	public fileOver(event){
		// console.log(event);
	}
	 
	public fileLeave(event){
		// console.log(event);
	}

	clearFiles(){
		this.files = [];
		this.tableFiles = []
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
	}

	progressWIDTH = 0
	uploadFile(){	
		this.progressWIDTH = 0
		if(this.tableFiles.length != 0){
			this.isUploading = true			
			let data = []
			for(let file in this.tableFiles){
				if(this.checkIfXlsx(this.tableFiles[file].name) == false){				
					data.push('JSONdata',this.ExcelService.convertExcelToJson(this.tableFiles[file])	)				
				}
				else{
					this.unUploadedFiles.push(this.tableFiles[file])
					console.log('unUploadedFiles',this.unUploadedFiles)
				}
			}		
			setInterval(() => {
					if(this.progressWIDTH <= 90){
						this.progressWIDTH +=1
					}					
			}, 200);

			let rows =  data.filter(function(a){return a !== 'JSONdata'})
			console.log('data',rows)
		
			
		}
		else{
			this.UtilityService.setAlert('No files to upload','error')
		}	
	}

}