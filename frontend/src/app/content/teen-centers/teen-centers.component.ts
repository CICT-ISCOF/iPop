import { UtilityService } from './../../utility.service';
import { TeenCentersService } from './teen-centers.service';
import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-teen-centers',
  templateUrl: './teen-centers.component.html',
  styleUrls: ['./teen-centers.component.scss']
})
export class TeenCentersComponent implements OnInit {

	back(){
		window.history.back()
	}
	
	addTeenCenter = false

	activeDistrict:any ={
		I:true,
		II:false,
		III:false,
		VI:false,
	}

	makeDistrictActive(item){
		for(let district in this.activeDistrict){
			this.activeDistrict[district] = false
		}
		this.activeDistrict[item] = true
	}

	constructor(
		private TeenCentersService : TeenCentersService,
		private UtilityService : UtilityService
	) { 
		this.listener = this.TeenCentersService.triggerListener().subscribe(value => {
			this.show = value
		})

		this.listener = this.TeenCentersService.backListener().subscribe(value => {
			this.addTeenCenter = value
		})
	}

	listener

	ngOnInit(): void {
		this.getTeenCenters()
	}
	
	show = false

	districts:any = {
	
	}

	data = []

	setdata(data){
		this.data = data
	}

	getTeenCenters(){
		this.TeenCentersService.getTeenCenters().subscribe(data =>{
			console.log('teen center', data)
			this.districts = data		
		})
	}

	showMPC(teenCenter){
		this.show = true
		localStorage.setItem('teen-center-ref',JSON.stringify(teenCenter))
	}


	
	activeMPC = {}
	editMPC(id,event){
	
		this.activeMPC[id] == true ?  this.activeMPC[id] = false : this.activeMPC[id] = true	
		
	}

	updateMPC(mpc){
		let tempPHotos = []
		tempPHotos = mpc['photos']
		delete mpc['photos']
		this.TeenCentersService.updateTeenCenter(mpc).subscribe(data => {
			this.UtilityService.setAlert(`${mpc.name} has been updated`,'success')
			this.getTeenCenters()
			mpc['photos'] = tempPHotos
		},(error) => {
			for (let message in error.error.errors) {
			  this.UtilityService.setAlert(error.error.errors[message], 'error');
			}
		})	
	}

	deleteMPC(mpc,event){
		Swal.fire({
			title: `Are you sure you want to delete ${mpc.name}?`,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.TeenCentersService.deleteTeenCenter(mpc.id).subscribe(data => {
					this.UtilityService.setAlert(`${mpc.name} has been removed`,'success')
					this.getTeenCenters()
				},error => {
					this.UtilityService.setAlert(`${mpc.name} has been removed`,'success')
					this.getTeenCenters()
				})		
				
			} 
		})	
	}

}
