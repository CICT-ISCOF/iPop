import { MediaQueryService } from '../../../others/media-query.service';
import { Component, OnInit } from '@angular/core';
import { DeathsService } from '../../deaths/deaths.service'
import { BirthsService } from '../../births/births.service'
import { UtilityService } from '../../../others/utility.service'
import { ExcelService } from '../../../others/excel.service'

@Component({
  selector: 'app-deaths-table',
  templateUrl: './deaths-table.component.html',
  styleUrls: ['./deaths-table.component.scss','../profiling.tablet.scss']
})
export class DeathsTableComponent implements OnInit {

	constructor(
		private DeathsService : DeathsService,
		private UtilityService : UtilityService,
		private ExcelService : ExcelService,
		private MediaQueryService : MediaQueryService
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

		
		this.reload  = this.MediaQueryService.getSize().subscribe(screenSize => {
			this.maxSize = this.processPaginationLength(screenSize)		
		})
	
	 }

		

	maxSize = 7
	reload
	paginationLabel = {
		Previous:'',
		Next:''
	}

	processPaginationLength(screenSize){		
		if(screenSize <= 1024){	
			this.paginationLabel = {
				Previous:'',
				Next:''
			}
			return 7
		
		}
		this.paginationLabel = {
			Previous:'Next',
			Next:'Previous'
		}		
		return 15
	}

	ngOnInit(): void {
		this.getDeathsList()
		this.searched = false
		this.keyword = ''
		this.MediaQueryService.setSize(window.innerWidth)
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

	isPaginating = false
	paginate(page){
		this.isPaginating = true	
		this.pagination.currentPage = page
		this.DeathsService.paginateAdminList(page).subscribe(response=>{
			this.DeathsService.setData(response.data)
			this.isPaginating = false	
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
