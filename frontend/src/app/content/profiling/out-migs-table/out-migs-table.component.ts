import { Component, OnInit } from '@angular/core';
import { OutMigService } from '../../out-mig/out-mig.service'
import { UtilityService } from '../../../utility.service'

@Component({
  selector: 'app-out-migs-table',
  templateUrl: './out-migs-table.component.html',
  styleUrls: ['./out-migs-table.component.scss']
})
export class OutMigsTableComponent implements OnInit {

	constructor(
		private OutMigService : OutMigService,
		private UtilityService : UtilityService
	) {
		this.reload = this.OutMigService.getMultipleDelete().subscribe(array => {
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
		this.OutMigService.getOutMigrationRecord().subscribe(response=>{				
			this.OutMigService.setData(response.data)
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
		this.OutMigService.paginateAdminList(page).subscribe(response=>{
			this.OutMigService.setData(response.data)
			this.isLoading = false	
			this.OutMigService.setData(response.data)
		})	
	}

	keyword = ''
	search(){

	}

	deleteRecord(id){
		this.OutMigService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.OutMigService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}

}
