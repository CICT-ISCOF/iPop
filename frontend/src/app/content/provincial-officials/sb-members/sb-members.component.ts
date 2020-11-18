import { UtilityService } from './../../../utility.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sb-members',
  templateUrl: './sb-members.component.html',
  styleUrls: ['./sb-members.component.scss']
})
export class SbMembersComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {
	}

	
	sbMembers = [1,2,1,2,1,2,1,2]
	activeSB = {	}

	getSBMembers(){
		let count = 0
		for(let content of this.sbMembers){
			count += 1
			this.activeSB[count] = false			
		}
	}

	sbMember = {
			name:''
		}
	addMember = false

	updateMember = {
			name:'',
			id:''
		}	

	deleteMember(member_id){	
		Swal.fire({
			title: 'Are you sure you want to remove this SB Member?',		
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

	saveMember(){
		this.UtilityService.setAlert('New SB Member Added','success')
	}

	saveSBMemberChanges(member_id){
		Swal.fire({
			title: 'Are you sure you want to update existing SB Member data?',		
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

	editMember(member_id){
		this.activeSB[member_id] == true ?  this.activeSB[member_id] = false : this.activeSB[member_id] = true	
	}

}
