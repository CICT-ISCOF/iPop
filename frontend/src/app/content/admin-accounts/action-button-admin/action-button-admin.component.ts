import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { UtilityService } from '../../../utility.service'
import { AdminService } from '../../../admin.service'

@Component({
  selector: 'app-action-button-admin',
  templateUrl: './action-button-admin.component.html',
  styleUrls: ['./action-button-admin.component.scss']
})
export class ActionButtonAdminComponent implements OnInit {

  
	constructor(
		private AdminService: AdminService,	
		private UtilityService : UtilityService
	) { }

	theme = localStorage.getItem('data-theme')

	ngOnInit(): void {

	}

	myAccount = JSON.parse(localStorage.getItem('user-data'))
	myID = this.myAccount.user.id

	admin = {
		id:''
	}

	params

	agInit(params:any){
		this.admin.id = params.value
		this.params = params.data
		this.params
		this.params.profile_picture != null ? this.imgSrc = this.params.profile_picture.uri : 
		this.imgSrc = window.location.origin + '/assets/avatars/boy-blue.png'
	}

	randomImages = [
		window.location.origin + '/assets/avatars/boy-blue.png',
		window.location.origin + '/assets/avatars/boyorange.png',
		window.location.origin + '/assets/avatars/girl-black.png',
		window.location.origin + '/assets/avatars/girl-orange.png'
	]


	imgSrc

	refresh(params:any):boolean{
		this.admin.id = params.value
		return true
		
	}

	blockAdmin(id){
		Swal.fire({
			title: 'Block '+  this.params.fullname +'?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Block',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {				
				const blocked = {blocked:true}	
				this.AdminService.blockorReactivate( blocked, id ).subscribe(data => {					
					this.UtilityService.setAlert('You had blocked '+ this.params.fullname+'.','info')
					this.AdminService.setReload(1)
				})
			} 
		})			
	}

	deleteAdmin(id){
		Swal.fire({
			title: 'Remove '+  this.params.fullname +'?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {			
				this.AdminService.deleteAdmin( id ).subscribe(data => {					
					this.UtilityService.setAlert('You have '+  this.params.fullname +' an admin','info')
					this.AdminService.setReload(1)
				})
			} 
		})
	}

	reactivate(id){	
		Swal.fire({
			title: 'Reactivate ' + this.params.fullname +'?',		
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: 'Reactivate',
			cancelButtonText: 'Later'
		  }).then((result) => {
			if (result.value) {				
				const blocked = {blocked:false}
				this.AdminService.blockorReactivate( blocked, this.admin.id ).subscribe(data => {	
					this.UtilityService.setAlert( this.params.fullname +'s has been successfully reactivated','success')		
					this.AdminService.setReload(1)
				})
			}			
		})	
	}

}
 