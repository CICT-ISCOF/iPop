import { Component, OnInit } from '@angular/core';
import { OutMigService } from '../../out-mig/out-mig.service'
import { UtilityService } from '../../../utility.service'
import { ExcelService } from '../../../excel.service'

@Component({
  selector: 'app-out-migs-table',
  templateUrl: './out-migs-table.component.html',
  styleUrls: ['./out-migs-table.component.scss']
})
export class OutMigsTableComponent implements OnInit {

	constructor(
		private OutMigService : OutMigService,
		private UtilityService : UtilityService,
		private ExcelService : ExcelService,
	) {
		this.reload = this.OutMigService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
		})
		
		this.reload = this.OutMigService.getRow().subscribe(data => {
			this.ngOnInit()
		})
	}

	reload

	ngOnInit(): void {
		this.getCPDBLists()
		this.searched = false
		this.keyword = ''
	}

	isLoading = false

	theme = localStorage.getItem('data-theme')

	getCPDBLists(){
		this.pagination = {
			currentPage:0,
			lastPage:0,
			totalPages:[],
		}
	
		this.isLoading = true	
		this.OutMigService.getOutMigrationRecord().subscribe(response=>{				
			this.OutMigService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false				
		})
	}

	pagination = {
		currentPage:0,
		lastPage:0,
		totalPages:[],
	}

	paginate(page){
		this.isLoading = true	
		this.pagination.currentPage = page
		this.OutMigService.paginateAdminList(page).subscribe(response=>{
			this.OutMigService.setData(response.data)
			this.isLoading = false	
			this.OutMigService.setData(response.data)
		})	
	}

	

	searchResults = []
	keyword = ''
	searched = false
	search(){
		this.searched = true
		this.pagination = {
			currentPage:0,
			lastPage:0,
			totalPages:[],
		}
		this.OutMigService.search(this.keyword).subscribe(response => {
			console.log('search', response)
			this.OutMigService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false		
		})
		this.OutMigService.getSearched(this.keyword).subscribe(data =>{
			this.searchResults = data
		})
	}

	print(){
		const fileName = prompt("Enter your file name")
		if(fileName != null){
			this.ExcelService.exportAsExcelFile(this.searchResults,fileName)
		}
	}


	searchHandler(event){	  
		if(	event.target.value == ""){
			this.isLoading = true
			this.searched = false
			this.ngOnInit() 
		}	
	}

	deleteRecord(id){
		this.OutMigService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.OutMigService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}

}
