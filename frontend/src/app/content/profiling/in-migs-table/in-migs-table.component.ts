import { Component, OnInit } from '@angular/core';
import { InMigService } from '../../in-mig/in-mig.service'
import { UtilityService } from '../../../utility.service'
import { ExcelService } from '../../../excel.service'

@Component({
  selector: 'app-in-migs-table',
  templateUrl: './in-migs-table.component.html',
  styleUrls: ['./in-migs-table.component.scss']
})
export class InMigsTableComponent implements OnInit {

	constructor(
		private InMigService : InMigService,
		private UtilityService : UtilityService,
		private ExcelService : ExcelService,
	) { 
		this.reload = this.InMigService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
			this.paginate(this.pagination.currentPage)
		})

		this.reload = this.InMigService.getRow().subscribe(data => {
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

	tableData = []
	getCPDBLists(){
		this.pagination = {
			currentPage:0,
			lastPage:0,
			totalPages:[],
		}
	
		this.isLoading = true	
		this.InMigService.getInMigrationLists().subscribe(response=>{				
			this.InMigService.setData(response.data)
			this.tableData = response.data
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

	isPaginating = false
	paginate(page){
		this.isPaginating = true	
		this.pagination.currentPage = page
		this.InMigService.paginateAdminList(page).subscribe(response=>{
			this.InMigService.setData(response.data)
			this.isPaginating = false	
			this.InMigService.setData(response.data)
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
		this.InMigService.search(this.keyword).subscribe(response => {
			console.log('search', response)
			this.InMigService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false
			this.pagination.totalPages.pop()		
		})
		this.InMigService.getSearched(this.keyword).subscribe(data =>{
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
		this.InMigService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.InMigService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}


}
