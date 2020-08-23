import { Component, OnInit } from '@angular/core';
import { InMigService } from '../../in-mig/in-mig.service'
import { UtilityService } from '../../../utility.service'

@Component({
  selector: 'app-in-migs-table',
  templateUrl: './in-migs-table.component.html',
  styleUrls: ['./in-migs-table.component.scss']
})
export class InMigsTableComponent implements OnInit {

	constructor(
		private InMigService : InMigService,
		private UtilityService : UtilityService
	) { 
		this.reload = this.InMigService.getMultipleDelete().subscribe(array => {
			for(let id in array){
				this.deleteRecord(array[id])
			}
		})
	}

	reload

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
		this.InMigService.getInMigrationLists().subscribe(response=>{				
			this.InMigService.setData(response.data)
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
		this.InMigService.paginateAdminList(page).subscribe(response=>{
			this.InMigService.setData(response.data)
			this.isLoading = false	
			this.InMigService.setData(response.data)
		})	
	}

	keyword = ''
	search(){

	}

	deleteRecord(id){
		this.InMigService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.InMigService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}


}
