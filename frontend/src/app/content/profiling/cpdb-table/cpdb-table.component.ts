import { Component, OnInit } from '@angular/core';
import { CpdbService } from '../../cpdb/cpdb.service'
import {   Subscription} from 'rxjs'
import { UtilityService } from '../../../utility.service'


@Component({
  selector: 'app-cpdb-table',
  templateUrl: './cpdb-table.component.html',
  styleUrls: ['./cpdb-table.component.scss']
})
export class CpdbTableComponent implements OnInit {

	constructor(
		private CpdbService : CpdbService,
		private UtilityService : UtilityService
	) {
		
		this.reload = this.CpdbService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
		})

		this.reload = this.CpdbService.getRow().subscribe(data => {
			this.ngOnInit()
		})
	 }

	reload

	ngOnInit(): void {
		this.getCPDBLists()
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
			console.log(response.data)	
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
		this.CpdbService.paginateAdminList(page).subscribe(response=>{
			this.CpdbService.setData(response.data)
			this.isLoading = false	
			this.CpdbService.setData(response.data)
		})	
	}

	keyword = ''
	search(){
		this.CpdbService.search(this.keyword).subscribe(data => {
			console.log(data)
		})
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
