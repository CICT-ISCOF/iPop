import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../../admin.service'
import { UtilityService } from '../../../utility.service'

@Component({
  selector: 'app-show-admin-status',
  templateUrl: './show-admin-status.component.html',
  styleUrls: ['./show-admin-status.component.scss']
})
export class ShowAdminStatusComponent implements OnInit {

	constructor(
		private route:ActivatedRoute,
		private AdminService: AdminService,
		private UtilityService: UtilityService,
		private Router: Router,
	) { 
		
	}

	changeRole = false
	isLoading = false

	ngOnInit(): void {
		this.route.params.subscribe(data => {
			this.getUser(data.id)
		});
	}

	admin:any = {
		fullname:''
	}

	getUser(id){
		this.isLoading = true
		this.AdminService.showAdmin(id).subscribe(data => {
			this.admin = data		
			this.isLoading = false
		})
	}

	blockAdmin(){
		this.isLoading = true	
		const blocked = {blocked:true}	
		this.AdminService.blockorReactivate( blocked, this.admin.id ).subscribe(data => {
			this.ngOnInit()		
		})
	}

	reactivate(){
		this.isLoading = true	
		const blocked = {blocked:false}
		this.AdminService.blockorReactivate( blocked, this.admin.id ).subscribe(data => {
			console.log(data)
			this.ngOnInit()			
		})
	}
	
	deleteAdmin(){
		alert(this.admin.id)
		if(confirm("Are you sure you want to delete this admin?")){
			this.AdminService.deleteAdmin( this.admin.id ).subscribe(data => {			
				this.Router.navigate(['/admin-accounts'])
				this.UtilityService.setAlert(this.admin.name + ' has been remove as an administrator','info')
			})
		}
	}

	triggerInput(){
		document.getElementById('profile-picture').click()
	}

	updateProfile(image){

	}

	newRole = ''
	saveChanges(){
		this.isLoading = true
		this.changeRole = false
		const role = {role:this.newRole}
		this.AdminService.updateRole( role, this.admin.id ).subscribe(data => {
			this.ngOnInit()			
		})
	}
}
