import { Component, OnInit } from '@angular/core';
import { BirthsService } from '../../births/births.service'


@Component({
  selector: 'app-births-table',
  templateUrl: './births-table.component.html',
  styleUrls: ['./births-table.component.scss']
})
export class BirthsTableComponent implements OnInit {

	constructor(
		private BirthsService : BirthsService
	) { }

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
		this.BirthsService.getBirthLists().subscribe(response=>{				
			this.BirthsService.setData(response.data)
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
		this.BirthsService.paginateAdminList(page).subscribe(response=>{
			this.BirthsService.setData(response.data)
			this.isLoading = false	
			this.BirthsService.setData(response.data)
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
