import { Component, OnInit,OnDestroy } from '@angular/core';
import { CpdbService } from '../../cpdb/cpdb.service'
import {   Subscription} from 'rxjs'
import { UtilityService } from '../../../utility.service'
import { ExcelService } from '../../../excel.service'
import { MediaQueryService } from '../../../media-query.service'

@Component({
  selector: 'app-cpdb-table',
  templateUrl: './cpdb-table.component.html',
  styleUrls: ['./cpdb-table.component.scss','../profiling.tablet.scss']
})
export class CpdbTableComponent implements OnInit {

	constructor(
		private CpdbService : CpdbService,
		private UtilityService : UtilityService,
		private ExcelService : ExcelService,
		private MediaQueryService : MediaQueryService
	) {
		
		this.reload = this.CpdbService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
			this.paginate(this.pagination.currentPage)
		})

		this.reload = this.CpdbService.getRow().subscribe(data => {
			this.ngOnInit()
		})

		this.reload  = this.MediaQueryService.getSize().subscribe(screenSize => {
			this.maxSize = this.processPaginationLength(screenSize)		
		})
	
	 }

		

	maxSize = 7
	reload: Subscription
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
		this.CpdbService.getCPDBLists().subscribe(response=>{				
			this.CpdbService.setData(response.data)
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
		this.CpdbService.paginateAdminList(page).subscribe(response=>{
			this.CpdbService.setData(response.data)
			this.isPaginating = false	
			this.CpdbService.setData(response.data)
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
		this.CpdbService.search(this.keyword).subscribe(response => {
			console.log('search', response)
			this.CpdbService.setData(response.data)
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false		
		})
		this.CpdbService.getSearched(this.keyword).subscribe(data =>{
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
		this.CpdbService.deleteCPDB(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.CpdbService.setActionToDelete()
	}

	refresh(){		
		this.ngOnInit()
	}

}
