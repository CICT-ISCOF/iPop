import { Component, OnInit } from '@angular/core';
import { MarriagesService } from '../../marriages/marriages.service'

@Component({
  selector: 'app-marriage-table',
  templateUrl: './marriage-table.component.html',
  styleUrls: ['./marriage-table.component.scss']
})
export class MarriageTableComponent implements OnInit {

	constructor(
		private MarriagesService : MarriagesService
	){

	}

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
		this.MarriagesService.getMarriageRecords().subscribe(response=>{				
			this.MarriagesService.setData(response.data)
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
		this.MarriagesService.paginateAdminList(page).subscribe(response=>{
			this.MarriagesService.setData(response.data)
			this.isLoading = false	
			this.MarriagesService.setData(response.data)
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
