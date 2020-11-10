import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'
import {MarriagesService } from '../../marriages/marriages.service'

@Component({
  selector: 'app-marriages-search',
  templateUrl: './marriages-search.component.html',
  styleUrls: ['./marriages-search.component.scss']
})
export class MarriagesSearchComponent implements OnInit {

	constructor(
		private SearchService : SearchService,
		private MarriagesService : MarriagesService
	) { 
		this.subscription = this.SearchService.getMarriageData().subscribe(response => {
			this.data = response.data						
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false	
			this.pagination.totalPages.pop()
			
		})
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
		this.MarriagesService.paginateSearch(page,this.keyword).subscribe(response=>{
			this.data = response.data						
			this.isPaginating = false
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false	
			this.pagination.totalPages.pop()
		})	
	}
	

	ngOnInit(): void {

	}

}
