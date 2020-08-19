import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service'
import { UtilityService } from '../../utility.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.scss']
})
export class AdminAccountsComponent implements OnInit {

	constructor(
		private  AdminService : AdminService,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {
		this.getAllAdmins()
	}

	theme = localStorage.getItem('data-theme')

	admins = []
	isLoading = false

	pagination = {
		currentPage:0,
		lastPage:0,
		totalPages:[],
	}

	district = [
		1,2,3,4,5,6
	]


	getAllAdmins(){
		this.isLoading = true	
		this.AdminService.getAdminLists().subscribe(response=>{
			this.admins = response.data
			this.pagination.currentPage = response.current_page
			this.pagination.lastPage = response.last_page
			for(let i = 0; i <= response.last_page; i ++){
				this.pagination.totalPages.push(i)
			}			
			this.isLoading = false				
		})
	}

	paginate(page){
		this.isLoading = true	
		this.pagination.currentPage = page
		this.AdminService.paginateAdminList(page).subscribe(response=>{
			this.admins = response.data
			this.isLoading = false	
		})
	}
	blockAdmin(id){
		Swal.fire({
			title: 'Block this admin?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Block',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.isLoading = true	
				const blocked = {blocked:true}	
				this.AdminService.blockorReactivate( blocked, id ).subscribe(data => {
					location.reload()
				})
			} 
		})			
	}

	deleteAdmin(id){
		Swal.fire({
			title: 'Remove this admin?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.isLoading = true	
				this.AdminService.deleteAdmin( id ).subscribe(data => {	
					location.reload()
					this.UtilityService.setAlert('You have deleted an admin','info')
				})
			} 
		})
	
		
	}



}
