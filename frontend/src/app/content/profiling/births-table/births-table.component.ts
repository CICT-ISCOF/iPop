import { MediaQueryService } from '../../../others/media-query.service';
import { Component, OnInit } from '@angular/core';
import { BirthsService } from '../../births/births.service'
import { UtilityService } from '../../../others/utility.service'
import { ExcelService } from '../../../others/excel.service'


@Component({
  selector: 'app-births-table',
  templateUrl: './births-table.component.html',
  styleUrls: ['./births-table.component.scss','../profiling.tablet.scss']
})
export class BirthsTableComponent implements OnInit {

	constructor(
		private BirthsService : BirthsService,
		private UtilityService : UtilityService,
		private ExcelService : ExcelService,
		private MediaQueryService : MediaQueryService
	) { 
		this.reload = this.BirthsService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
			this.paginate(this.pagination.currentPage)
		})

		this.reload = this.BirthsService.getRow().subscribe(data => {
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
		this.getCPDBLists()
		this.searched = false
		this.keyword = ''		
		this.MediaQueryService.setSize(window.innerWidth)
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
		this.BirthsService.getBirthLists().subscribe(response=>{				
			this.BirthsService.setData(response.data)
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
		this.BirthsService.paginateAdminList(page).subscribe(response=>{
			this.BirthsService.setData(response.data)
			this.isPaginating = false	
			this.BirthsService.setData(response.data)
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
		this.BirthsService.search(this.keyword).subscribe(response => {
			this.BirthsService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false		
		})
		this.BirthsService.getSearched(this.keyword).subscribe(data =>{
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
		this.BirthsService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.BirthsService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}
}
