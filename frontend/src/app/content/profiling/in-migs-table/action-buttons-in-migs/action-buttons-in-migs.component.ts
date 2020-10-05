import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { InMigService } from '../../../in-mig/in-mig.service'
import { UtilityService } from '../../../../utility.service'
 
@Component({
  selector: 'app-action-buttons-in-migs',
  templateUrl: './action-buttons-in-migs.component.html',
  styleUrls: ['./action-buttons-in-migs.component.scss']
})
export class ActionButtonsInMigsComponent implements OnInit {

 
  constructor(
    private InMigService : InMigService,
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
		this.InMigService.updateStatus(status,id).subscribe(data => {
			this.InMigService.setRow()
			this.UtilityService.setAlert('Status has been change to ' + status , 'success')
		})
	}

}
