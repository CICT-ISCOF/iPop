import { Component, OnInit } from '@angular/core';
import { MarriagesService } from '../../marriages/marriages.service'
import { UtilityService } from '../../../utility.service'
import { ExcelService } from '../../../excel.service'

@Component({
  selector: 'app-marriage-table',
  templateUrl: './marriage-table.component.html',
  styleUrls: ['./marriage-table.component.scss']
})
export class MarriageTableComponent implements OnInit {

	constructor(
		private MarriagesService : MarriagesService,
		private UtilityService : UtilityService,
		private ExcelService : ExcelService,
	) { 
		this.reload = this.MarriagesService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
			this.paginate(this.pagination.currentPage)
		})

		this.reload = this.MarriagesService.getRow().subscribe(data => {
			this.ngOnInit()
		})
	}

	reload

	ngOnInit(): void {
		this.searched = false
		this.keyword = ''
		this.getMarraigeRecord()
	}

	isLoading = false

	theme = localStorage.getItem('data-theme')

	getMarraigeRecord(){
		this.pagination = {
			currentPage:0,
			lastPage:0,
			totalPages:[],
		}
	
		this.isLoading = true	
		this.MarriagesService.getMarriageRecords().subscribe(response=>{				
			this.MarriagesService.setData(response.data)
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

	isPaginating = false
	paginate(page){
		this.isPaginating = true	
		this.pagination.currentPage = page
		this.MarriagesService.paginateAdminList(page).subscribe(response=>{
			this.MarriagesService.setData(response.data)
			this.isPaginating = false	
			this.MarriagesService.setData(response.data)
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
		this.MarriagesService.search(this.keyword).subscribe(response => {
			console.log('search', response)
			this.MarriagesService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false		
		})
		this.MarriagesService.getSearched(this.keyword).subscribe(data =>{
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
		this.MarriagesService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.MarriagesService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}

}
