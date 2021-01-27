import { UtilityService } from './../../../utility.service';
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
		private UtilityService : UtilityService
	) { 
		this.OfficialsService.listen().subscribe(()=>{
			this.CheckBarangaysAndMunicipalities()
			this.official.municipality = localStorage.getItem('municipality-ref')
			if(this.hasBarangaysAndMunicipalities == true){
				this.retieve()
			}
		})
	}

	hasBarangaysAndMunicipalities = false

	ngOnInit(): void {
		
	}

	CheckBarangaysAndMunicipalities(){
		if(localStorage.getItem('municipality-ref') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		if(localStorage.getItem('barangay-ref') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		this.hasBarangaysAndMunicipalities =  true
		return
	}

	official = {
		municipality:localStorage.getItem('municipality-ref')
	}
	officials = []

	create(){
		this.OfficialsService.createMuncipalOfficials(this.official).subscribe(data => {
			this.UtilityService.setAlert('Added a new Municipali Officials','success')
			this.retieve()
		})
	} 

	retieve(){
		this.OfficialsService.retieveMuncipalOfficials(localStorage.getItem('municipality-ref')).subscribe(data => {
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
			title: 'Are you sure you want to update existing Official data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.OfficialsService.deleteMuncipalOfficials(official.id).subscribe(data => {
					this.UtilityService.setAlert(`${official.name} has been updated`,'success')
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
 