import { Component, OnInit } from '@angular/core';
import { DeathsService } from '../../deaths/deaths.service'

@Component({
  selector: 'app-deaths-table',
  templateUrl: './deaths-table.component.html',
  styleUrls: ['./deaths-table.component.scss']
})
export class DeathsTableComponent implements OnInit {

	constructor(
		private DeathsService : DeathsService
	) { }

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

	}

	multipleDelete(){

	}

	refresh(){

	}
	


}
