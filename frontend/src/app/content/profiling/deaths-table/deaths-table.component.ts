import { Component, OnInit } from '@angular/core';
import { DeathsService } from '../../deaths/deaths.service'
import { BirthsService } from '../../births/births.service'
import { UtilityService } from '../../../utility.service'
import { ExcelService } from '../../../excel.service'

@Component({
  selector: 'app-deaths-table',
  templateUrl: './deaths-table.component.html',
  styleUrls: ['./deaths-table.component.scss']
})
export class DeathsTableComponent implements OnInit {

	constructor(
		private DeathsService : DeathsService,
		private UtilityService : UtilityService,
		private ExcelService : ExcelService
	) { 
		this.reload = this.DeathsService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
			this.paginate(this.pagination.currentPage)
		})

		this.reload = this.DeathsService.getRow().subscribe(data => {
			this.ngOnInit()
		})

		
	}

	reload

	ngOnInit(): void {
		this.getDeathsList()
		this.searched = false
		this.keyword = ''
			
	}

	isLoading = false

	theme = localStorage.getItem('data-theme')

	getDeathsList(){
		this.pagination = {
			currentPage:0,
			lastPage:0,
			totalPages:[],
		}
	
		this.isLoading = true	
		this.DeathsService.getDeathLists().subscribe(response=>{				
			this.DeathsService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false			
			this.pagination.totalPages.pop()	
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
		this.DeathsService.paginateAdminList(page).subscribe(response=>{
			this.DeathsService.setData(response.data)
			this.isLoading = false	
			this.DeathsService.setData(response.data)
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
		this.DeathsService.search(this.keyword).subscribe(response => {
			console.log('search', response)
			this.DeathsService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false		
		})
		this.DeathsService.getSearched(this.keyword).subscribe(data =>{
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
		this.DeathsService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.DeathsService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}
	


}
