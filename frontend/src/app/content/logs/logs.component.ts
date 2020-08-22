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
			console.log(this.logs)
		})
	}

	paginate(page){
		this.isLoading = true	
		this.pagination.currentPage = page
		this.LogsService.paginateLogs(page).subscribe(response=>{
			this.logs = response.data
			this.isLoading = false	
		})
	}


	formatUserAgent(agent){
		let array = agent.split('/')
		return  array[array.length - 2].replace(/[0-9,.]/g, '')
	}

	checkifMobile(params){
		if(params.includes('Mobile')){
			return false
		}
		return true
	}

	deleteLog(id){

	}



}
