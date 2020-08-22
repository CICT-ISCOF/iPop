import { Component, OnInit } from '@angular/core';
import { CpdbService } from '../../cpdb/cpdb.service'


@Component({
  selector: 'app-cpdb-table',
  templateUrl: './cpdb-table.component.html',
  styleUrls: ['./cpdb-table.component.scss']
})
export class CpdbTableComponent implements OnInit {

	constructor(
		private CpdbService : CpdbService
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
		this.CpdbService.getCPDBLists().subscribe(response=>{				
			this.CpdbService.setData(response.data)
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
		this.CpdbService.paginateAdminList(page).subscribe(response=>{
			this.CpdbService.setData(response.data)
			this.isLoading = false	
			this.CpdbService.setData(response.data)
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
