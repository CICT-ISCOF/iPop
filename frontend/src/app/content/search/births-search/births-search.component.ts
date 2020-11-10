import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'
import { CpdbService } from '../../cpdb/cpdb.service'

@Component({
  selector: 'app-births-search',
  templateUrl: './births-search.component.html',
  styleUrls: ['./births-search.component.scss']
})
export class BirthsSearchComponent implements OnInit {

	constructor(
		private SearchService : SearchService,
		private CpdbService : CpdbService
	) { 
		this.subscription = this.SearchService.getBirthData().subscribe(response => {
			this.data = response.data						
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false	
			this.pagination.totalPages.pop()
		})

		this.subscription = this.SearchService.getKeyword().subscribe(keyword => this.keyword = keyword)
	}

	keyword = ''
	data = []
	isLoading = false
	subscription: Subscription
	pagination = {
		currentPage:0,
		lastPage:0,
		totalPages:[],
	}

	isPaginating = false
	paginate(page){		
		this.isPaginating = true
		this.pagination.currentPage = page
		this.CpdbService.paginateSearch(page,this.keyword).subscribe(data=>{
			this.data = data						
			this.isPaginating = false
			this.pagination.currentPage = page				
			this.isLoading = false	
			
		})	
	}

	ngOnInit(): void {

	}




}
