import { Component, OnInit } from '@angular/core';
import { CpdbService } from '../../../cpdb/cpdb.service'
import { UtilityService } from '../../../../others/utility.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-action-buttons-cpdb',
  templateUrl: './action-buttons-cpdb.component.html',
  styleUrls: ['./action-buttons-cpdb.component.scss']
})
export class ActionButtonsCpdbComponent implements OnInit {

	constructor(
		private CpdbService : CpdbService,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {
	}

	theme = localStorage.getItem('data-theme')

	params

	agInit(params:any){
		this.params = params.data
	}

	refresh(params:any):boolean{
	this.params = params.data
		return true
	}

	approve(){		
		Swal.fire({
			title: 'Countinue approving this data?' ,		
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: 'Approve',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				status = 'Approved'
				this.updateStatus(status)
			}		
		})	
	}

	disapprove(){
		Swal.fire({
			title: 'Are you sure you want to disapprove this data?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Disapprove',
			cancelButtonText: 'Nope'
			}).then((result) => {
			if (result.value) {
				status = 'Disapproved'
				this.updateStatus(status)
			}		
		})	
	}

	needsEditing(){
		status = 'Needs Editing'
		this.updateStatus(status)
	}

	noted(){
		status = 'Noted and will edit'
		this.updateStatus(status)
	}

	updateStatus(status){
		const id = this.params.record.id
		this.CpdbService.updateStatus(status,id).subscribe(data => {
			this.CpdbService.setRow()
			this.UtilityService.setAlert('Status has been change to ' + status , 'success')
		})
	}

}
