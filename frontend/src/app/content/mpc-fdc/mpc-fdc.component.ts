import { UserService } from './../../user.service';
import Swal  from 'sweetalert2';
import { UtilityService } from './../../utility.service';
import { LocationService } from './../../location.service';
import { Component, OnInit } from '@angular/core';
import { MpcService } from './mpc.service'
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
@Component({
  selector: 'app-mpc-fdc',
  templateUrl: './mpc-fdc.component.html',
  styleUrls: ['./mpc-fdc.component.scss']
})
export class MPCFDCComponent implements OnInit {

	constructor(
		private MpcService : MpcService,
		private LocationService : LocationService,
		private UtilityService  : UtilityService,
		private UserService  : UserService,
	) { 
	
	}
	isUser =  !this.UserService.isUser()
	districtS = ['II','II','III','IV']
	municipalities = []
	show = false
	mpc:any  = {}
	mpcs = []

	ngOnInit(): void {
		this.getMuncipalities()
	}

	back(){
		window.history.back()
	}

	municipalityIsLoading = false
	getMuncipalities(){
		this.municipalityIsLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.municipalityIsLoading = false			
		})		
	}

	showMPC(mpc){
		this.show = false 
		localStorage.setItem('mpc-ref',JSON.stringify(mpc))
		this.show = true 
		this.MpcService.setMPC(mpc)
	}
	
	getMPCFDC(){		
		this.MpcService.retrieveMPC(this.mpc).subscribe(data => {
			this.mpcs = data
		})
	}
	
	updateMPC(mpc){
		let tempFiles = []
		tempFiles = mpc.files
		mpc['files'] = []
		this.MpcService.updateMPC(mpc).subscribe(data => {
			this.UtilityService.setAlert(`${mpc.name} has been updated`,'success')
			mpc['files'] = tempFiles
		})
	}

	deleteMPC(mpc){
		Swal.fire({
			title: `Are you sure you want to delete ${mpc.name}?`,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.MpcService.deleteMPC(mpc.id).subscribe(data => {
					this.UtilityService.setAlert(`${mpc.name} has been removed`,'success')
					this.getMPCFDC()
				},error => {
					this.UtilityService.setAlert(`${mpc.name} has been removed`,'success')
					this.getMPCFDC()
				})		
				
			} 
		})	
	}

	activeMPC = {}
	editMPC(id){
		this.activeMPC[id] == true ?  this.activeMPC[id] = false : this.activeMPC[id] = true	
	}

	

}
