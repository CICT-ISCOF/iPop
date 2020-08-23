import { Component, OnInit } from '@angular/core';
import { MarriagesService } from '../../marriages/marriages.service'
import { UtilityService } from '../../../utility.service'

@Component({
  selector: 'app-marriage-table',
  templateUrl: './marriage-table.component.html',
  styleUrls: ['./marriage-table.component.scss']
})
export class MarriageTableComponent implements OnInit {

	constructor(
		private MarriagesService : MarriagesService,
		private UtilityService : UtilityService
	){
		this.reload = this.MarriagesService.getMultipleDelete().subscribe(array => {
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

	
	deleteRecord(id){
		this.MarriagesService.deleteRecord(id).subscribe(data=>{
			this.UtilityService.setAlert('Data has been sucessfully deleted, Please refresh to see changes','info')
		})
	}


	multipleDelete(){
		this.MarriagesService.setActionToDelete()
	}

	refresh(){
		this.ngOnInit()
	}

}
