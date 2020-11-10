
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'
import { InMigService } from '../../in-mig/in-mig.service'

@Component({
  selector: 'app-in-migs-search',
  templateUrl: './in-migs-search.component.html',
  styleUrls: ['./in-migs-search.component.scss']
})
export class InMigsSearchComponent implements OnInit {

	constructor(
		private SearchService : SearchService,
		private InMigService : InMigService
	) { 
		this.subscription = this.SearchService.getImigrationData().subscribe(response => {
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
		this.InMigService.paginateSearch(page,this.keyword).subscribe(data=>{
			this.data = data						
			this.isPaginating = false
			this.pagination.currentPage = page				
			this.isLoading = false	
			
		})	
	}
	

	ngOnInit(): void {

	}

}
