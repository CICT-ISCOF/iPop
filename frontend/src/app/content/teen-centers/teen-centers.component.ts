import { TeenCentersService } from './teen-centers.service';
import { Component, OnInit } from '@angular/core';

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

	district:any = {
		I:{data:[]},
		II:{data:[]},
		III:{data:[]}		
	}
	getTeenCenters(){
		this.TeenCentersService.getTeenCenters().subscribe(data =>{
			console.log('teen center', data)
			this.district = data
			console.log(data)
		})
	}

	showMPC(id){
		this.show = true
		this.TeenCentersService.showTeenCenter(id).subscribe(data => {

		})
	}

}
