import { UserService } from '../../../others/user.service';
import { UtilityService } from '../../../others/utility.service';
import { OfficialsService1 } from './../officials.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'barangay-officials',
  templateUrl: './barangay-officials.component.html',
  styleUrls: ['./barangay-officials.component.scss']
})
export class BarangayOfficialsComponent implements OnInit {

	constructor(
		private OfficialsService : OfficialsService1,
		private UtilityService : UtilityService,
		private UserService : UserService
	) { 
		this.OfficialsService.listen().subscribe(()=>{
			
				this.retieve()
		})
	}
	isUser =  !this.UserService.isUser()
	hasBarangaysAndMunicipalities = false

	ngOnInit(): void {
        this.retieve()
	}

	official = {
		barangay:localStorage.getItem('barangay-ref')
	}
	officials = []

	create(){
		this.OfficialsService.createBarangaylOfficials(this.official).subscribe(data => {
			this.UtilityService.setAlert('Added a new Municipali Officials','success')
			this.retieve()
		})
	} 

	retieve(){
		this.OfficialsService.retieveBarangayOfficials(localStorage.getItem('barangay')).subscribe(data => {
			this.officials = data
			
		})
	} 

	update(official){
		this.OfficialsService.updateBarangayOfficials(official).subscribe(data => {
			this.UtilityService.setAlert(`${official.name} has been updated`,'success')
			this.retieve()
		})
	} 

	deleteOfficial(official){
		Swal.fire({
			title: 'Are you sure you want to remove Official data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.OfficialsService.deleteBarangayOfficials(official.id).subscribe(data => {
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
