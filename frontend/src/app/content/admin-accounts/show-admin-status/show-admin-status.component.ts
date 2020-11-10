import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../../admin.service'
import { UtilityService } from '../../../utility.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-show-admin-status',
  templateUrl: './show-admin-status.component.html',
  styleUrls: ['./show-admin-status.component.scss','../admin-accounts.component.responsive.scss']
})
export class ShowAdminStatusComponent implements OnInit {

	constructor(
		private route:ActivatedRoute,
		private AdminService: AdminService,
		private UtilityService: UtilityService,
		private Router: Router,
	) { 
		
	}
 
	theme = localStorage.getItem('data-theme')

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

	myAccount = JSON.parse(localStorage.getItem('user-data'))

	imgIsLoading = false
	getUser(id){
		this.imgIsLoading = true
		this.isLoading = true
		this.AdminService.showAdmin(id).subscribe(data => {
			this.admin = data		
			this.isLoading = false			
			data.profile_picture != null ? this.imgSrc = data.profile_picture.uri : 
			this.imgSrc = window.location.origin + '/assets/avatars/boy-blue.png'
			this.imgIsLoading = false
		})
	}

	blockAdmin(){
		Swal.fire({
			title: 'Block ' + this.admin.fullname +' from becoming Administrator?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Block',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.isLoading = true	
				const blocked = {blocked:true}	
				this.AdminService.blockorReactivate( blocked, this.admin.id ).subscribe(data => {
					this.admin = data
					this.isLoading = false
				})
			} 
		})		
	}

	reactivate(){	
		Swal.fire({
			title: 'Reactivate ' + this.admin.fullname +'?',		
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: 'Reactivate',
			cancelButtonText: 'Later'
		  }).then((result) => {
			if (result.value) {
				this.isLoading = true	
				const blocked = {blocked:false}
				this.AdminService.blockorReactivate( blocked, this.admin.id ).subscribe(data => {				
					this.admin = data
					this.isLoading = false
				})
			}			
		})	
	}
	
	deleteAdmin(){
		Swal.fire({
			title: 'Remove ' + this.admin.fullname +' as Administrator',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.AdminService.deleteAdmin( this.admin.id ).subscribe(data => {			
					this.Router.navigate(['/admin-accounts'])
					this.UtilityService.setAlert(this.admin.fullname + ' has been remove as an administrator','info')
				})
			}			
		})	
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
			this.admin = data
			this.isLoading = false
		})
	}

	imgSrc:any = ''
	readURL(files: FileList,event) {  
		this.isLoading = true			
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {			
				this.imgSrc = (<FileReader>event.target).result;		
				let profile_picture = files.item(0)	
				const formData = new FormData()	
				formData.append('profile_picture', profile_picture, profile_picture.name); 
				formData.append('_method', 'PUT'); 
				this.AdminService.changeProfilePicture(formData,this.admin.id).subscribe(data =>{
					this.isLoading = false		
					this.UtilityService.setAlert('Profile Image has been successfully changed','success')
				})
			}
		}		
	}

	permissions = {
		approve:true,
		disapprove:false,
		delete:false,
		request_editing:false,	
		editData:false	
	}

	changePermissions(category){
		this.permissions[category] = this.permissions[category] == true ? false : true		
	}

	approveToggle = {
		name : 'approveToggle',
		id :'approveToggle',
		checked : this.permissions.approve,
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}

	disApproveToggle = {
		name : 'disApproveToggle',
		id :'disApproveToggle',
		checked : this.permissions.disapprove,
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}

	deleteToggle = {
		name : 'deleteToggle',
		id :'deleteToggle',
		checked : this.permissions.delete,
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}

	requestEditingToggle = {
		name : 'requestEditingToggle',
		id :'requestEditingToggle',
		checked : this.permissions.request_editing,
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}

	editingToggle = {
		name : 'editingToggle',
		id :'editingToggle',
		checked : this.permissions.editData,
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}


}
