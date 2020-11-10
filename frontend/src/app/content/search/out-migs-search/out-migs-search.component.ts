import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'
import { OutMigService } from '../../out-mig/out-mig.service'

@Component({
  selector: 'app-out-migs-search',
  templateUrl: './out-migs-search.component.html',
  styleUrls: ['./out-migs-search.component.scss']
})
export class OutMigsSearchComponent implements OnInit {

	constructor(
		private SearchService : SearchService,
		private OutMigService : OutMigService
	) { 
		this.subscription = this.SearchService.getOutMigrationData().subscribe(response => {
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
		this.OutMigService.paginateSearch(page,this.keyword).subscribe(data=>{
			this.data = data						
			this.isPaginating = false
			this.pagination.currentPage = page				
			this.isLoading = false	
			
		})	
	}

	
	

	ngOnInit(): void {

	}

}
