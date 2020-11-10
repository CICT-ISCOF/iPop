import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { OutMigService } from '../../../out-mig/out-mig.service'
import { UtilityService } from '../../../../utility.service'
@Component({
  selector: 'app-action-buttons-out-migs',
  templateUrl: './action-buttons-out-migs.component.html',
  styleUrls: ['./action-buttons-out-migs.component.scss']
})
export class ActionButtonsOutMigsComponent implements OnInit {

 
  constructor(
    private OutMigService : OutMigService,
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
		this.OutMigService.updateStatus(status,id).subscribe(data => {
			this.OutMigService.setRow()
			this.UtilityService.setAlert('Status has been change to ' + status , 'success')
		})
	}

}
