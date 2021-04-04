import { UserService } from '../../../others/user.service';
import { UtilityService } from '../../../others/utility.service';
import { OfficialsService1 } from './../officials.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'municipality-officials',
  templateUrl: './municipality-officials.component.html',
  styleUrls: ['./municipality-officials.component.scss']
})
export class MunicipalityOfficialsComponent implements OnInit {

	constructor(
		private OfficialsService : OfficialsService1,
		private UtilityService : UtilityService,
		private UserService : UserService
	) { 
		this.OfficialsService.listen().subscribe(()=>{
            this.retieve()
		})
	}
 
    isUser = !this.UserService.isUser()

	hasBarangaysAndMunicipalities = false

	ngOnInit(): void {
        this.retieve()
	}

	
	official = {
		municipality:localStorage.getItem('municipality-ref')
	}
	officials = []

	create(){
		this.OfficialsService.createMuncipalOfficials(this.official).subscribe(data => {
			this.UtilityService.setAlert('Added a new Municipal Officials','success')
			this.retieve()
		})
	} 

	retieve(){
        this.OfficialsService.retieveMuncipalOfficials( localStorage.getItem('muncipality')).subscribe(data => {
			this.officials = data
		})
	} 

	update(official){
		this.OfficialsService.updateMuncipalOfficials(official).subscribe(data => {
			this.UtilityService.setAlert(`${official.name} has been updated`,'success')
			this.retieve()
		})
	} 

	deleteOfficial(official){
		Swal.fire({
			title: 'Are you sure you want to remove  Official data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.OfficialsService.deleteMuncipalOfficials(official.id).subscribe(data => {
					this.UtilityService.setAlert(`${official.name} has been removed`,'success')
					this.retieve()
				})		
			} 
		})	
	} 

	activeOfficials = {}
	editOfficial(official_id){
		this.activeOfficials[official_id] == true ?  this.activeOfficials[official_id] = false : this.activeOfficials[official_id] = true	
	}

}
 