import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs/logs.service'


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

	constructor(
		private LogsService : LogsService
	) { }

	ngOnInit(): void {
		this.getAllLogs()
	}
	theme = localStorage.getItem('data-theme')
	logs = []

	keyword = ''
	
	pagination = {
		currentPage:0,
		lastPage:0,
		totalPages:[],
	}

	isLoading = false
	 

	getAllLogs(){
		this.isLoading = true
		this.LogsService.getLogs().subscribe(response => {
			this.logs = response.data
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false				
			this.pagination.totalPages.pop()
		})
	}

	isPaginating = false
	paginate(page){	
		this.isPaginating = true	
		this.pagination.currentPage = page
		this.LogsService.paginateLogs(page).subscribe(response=>{
			this.logs = response.data		
			this.LogsService.setPage(response.data)
			this.isPaginating = false
		})
	}



	deleteLog(id){

	}

	refresh(){
		this.ngOnInit()
	}

	search(){

	}

	multipleDelete(){

	}


}
