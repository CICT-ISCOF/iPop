import { UtilityService } from './../../utility.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-provincial-officials',
  templateUrl: './provincial-officials.component.html',
  styleUrls: ['./provincial-officials.component.scss']
})
export class ProvincialOfficialsComponent implements OnInit {

    constructor(
		private UtilityService : UtilityService
	) { }

    ngOnInit(): void {
    }
    
	officials = [1,2]
	

	activeOfficials = {	}
	
	getOfficials(){
		let count = 0
		for(let content of this.officials){
			count += 1
			this.activeOfficials[count] = false			
		}
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
				this.UtilityService.setAlert('official has been removed','success')
			} 
		})
	}

	saveOfficial(){
		this.UtilityService.setAlert('New Official Added','success')
	}

	saveOfficialChanges(official_id){
		Swal.fire({
			title: 'Are you sure you want to update existing Official data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.UtilityService.setAlert('Changes Saved','success')
			} 
		})	
	}

	editOfficial(official_id){
		this.activeOfficials[official_id] == true ?  this.activeOfficials[official_id] = false : this.activeOfficials[official_id] = true	
	}
	



}
