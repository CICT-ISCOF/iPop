import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service'
import { UtilityService } from '../../utility.service'

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

	admins = []
	isLoading = false

	pagination = {
		currentPage:0,
		lastPage:0,
		totalPages:[],
	}


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
			console.log(response)
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
		this.isLoading = true	
		const blocked = {blocked:true}	
		this.AdminService.blockorReactivate( blocked, id ).subscribe(data => {
			this.ngOnInit()		
		})
	}

	deleteAdmin(id){
	
		if(confirm("Are you sure you want to delete this admin?")){
			this.AdminService.deleteAdmin( id ).subscribe(data => {	
				this.ngOnInit()
				this.UtilityService.setAlert('You have deleted an admin','info')
			})
		}
	}



}
