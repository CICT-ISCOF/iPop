import { OfficialsService } from './../officials.service';
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
		private UtilityService : UtilityService,
		private OfficialsService : OfficialsService
	) { }

	ngOnInit(): void {
		this.getSBMembers()
	}

	
	sbMembers = []
	activeSB = {	}

	getSBMembers(){
		this.OfficialsService.retrieve().subscribe(data => {
			this.sbMembers = data.data
		})
	}

	sbMember = {
			name:''
		}
	addMember = false

	updateMember = {
			name:'',
			id:''
		}	

	deleteMember(id){	
		Swal.fire({
			title: 'Are you sure you want to remove this SB Member?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {				
				this.OfficialsService.deleteSB(id).subscribe(data =>{
					this.UtilityService.setAlert(' SB Member has been removed','info')
					this.ngOnInit()
				})
			} 
		})	
	}

	saveMember(){
		this.addMember = false
		this.OfficialsService.create(this.sbMember).subscribe(data =>{
			this.UtilityService.setAlert('new SB Member Added','success')
			this.ngOnInit()
		})
	}

	saveSBMemberChanges(id, member){		
		Swal.fire({
			title: 'Are you sure you want to update existing SB Member data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.OfficialsService.update(id, member).subscribe(data =>{
					this.UtilityService.setAlert('Changes has been saved','success')
					this.ngOnInit()		
					this.editMember(id)		
				})
			} 
		})	
	}
	

	editMember(member_id){
		this.activeSB[member_id] == true ?  this.activeSB[member_id] = false : this.activeSB[member_id] = true	
	}

}
