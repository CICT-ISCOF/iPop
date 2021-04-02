import { UserService } from '../../others/user.service';
import { OfficialsService } from './officials.service';
import { UtilityService } from '../../others/utility.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-provincial-officials',
  templateUrl: './provincial-officials.component.html',
  styleUrls: ['./provincial-officials.component.scss']
})
export class ProvincialOfficialsComponent implements OnInit {

    constructor(
		private UtilityService : UtilityService,
		private OfficialsService : OfficialsService,
		private UserService : UserService
	) { 
		this.OfficialsService.getOfficialsFilter().subscribe(data => {
			this.officialsImage = data
		})
	}
	isUser =  !this.UserService.isUser()
	
	officialsImage = ""

    ngOnInit(): void {
		this.getOfficials()
    }
    
	officials = []
	

	activeOfficials = {	}
	
	getOfficials(){
		this.OfficialsService.getOfficials().subscribe(data => {
			this.officials = data.data
		})	
	}
	
	official = {
		name:'',
		position:''
	}
	
	addOfficial = false

	updateOfficial = {
		name:'',
		position:'',
		id:''
	}
	
	deleteOfficial(official_id){
		Swal.fire({
			title: 'Are you sure you want to remove this Official?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.OfficialsService.deleteOfficial(official_id).subscribe(data =>{
					this.UtilityService.setAlert('official has been removed','success')
					this.ngOnInit()
				})				
			} 
		},(error) => {
			for (let message in error.error.errors) {
			  this.UtilityService.setAlert(error.error.errors[message], 'error');
			}
		  }) 
	}

	saveOfficial(){
		this.OfficialsService.storeOfficials(this.official).subscribe(data => {
			this.UtilityService.setAlert('New Official Added','success')
			this.addOfficial = false
			this.ngOnInit()
		})	
	}

	saveOfficialChanges(official_id,official){
		Swal.fire({
			title: 'Are you sure you want to update existing Official data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.editOfficial(official_id)
				this.OfficialsService.updateOfficial(official_id,official).subscribe(data =>{
					this.UtilityService.setAlert('Changes Saved','success')
					this.ngOnInit()
				})				
			} 
		})	
	}
	

	editOfficial(official_id){
		this.activeOfficials[official_id] == true ?  this.activeOfficials[official_id] = false : this.activeOfficials[official_id] = true	
	}
	



}
