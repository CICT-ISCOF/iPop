import { Component, OnInit } from '@angular/core';
import { DeathsService } from '../../deaths/deaths.service'
import { BirthsService } from '../../births/births.service'
import { UtilityService } from '../../../utility.service'

@Component({
  selector: 'app-deaths-table',
  templateUrl: './deaths-table.component.html',
  styleUrls: ['./deaths-table.component.scss']
})
export class DeathsTableComponent implements OnInit {

	constructor(
		private DeathsService : DeathsService,
		private UtilityService : UtilityService
	) { 
		this.reload = this.DeathsService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
		})

		this.reload = this.DeathsService.getRow().subscribe(data => {
			this.ngOnInit()
		})

		
	}

	reload

	ngOnInit(): void {
		this.getDeathsList()
			
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

	keyword = ''
	search(){
		this.DeathsService.search(this.keyword).subscribe(response => {
			this.DeathsService.setData(response.data)				
		})
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
