import { UtilityService } from './../../../utility.service';
import { TeenCentersService } from './../teen-centers.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-show-teen-centers',
  templateUrl: './show-teen-centers.component.html',
  styleUrls: ['./show-teen-centers.component.scss']
})
export class ShowTeenCentersComponent implements OnInit {

  	constructor(
		private TeenCentersService : TeenCentersService,
		private UtilityService : UtilityService
	) { }

	addPersnalInCharge = false

	ngOnInit(): void {
		console.log('teenCenter',this.teenCenter)
	}

	teenCenter = JSON.parse(localStorage.getItem('teen-center-ref'))

	triggerInput(){
		document.getElementById('file1').click()
	}

	readURL(files, event){
		alert('ari')
		this.teenCenter['files'] = []
		this.teenCenter['photos'] = []
		Object.keys(files).forEach(i => {				
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[i]);   		     
			reader.onload = (event) => {	
				this.teenCenter['files'].push( (<FileReader>event.target).result		)
				this.teenCenter['photos'].push( (<FileReader>event.target).result		)
				this.TeenCentersService.updateTeenCenter(this.teenCenter).subscribe(data => {
					this.ngOnInit()
					this.teenCenter = data
				})
			}	
		})
		console.log(this.teenCenter)
	}

	triggerFile(){
		document.getElementById('personnel').click()
	}

	// readUrl(event){
	// 	const reader = new FileReader();   
	// 	reader.readAsDataURL(event.target.files[0]);   
	// 	reader.onload = (event) => {		
	// 		this. src = (<FileReader>event.target).result
	// 	}
	// }

	src:any = '../../../../assets/avatars/boy-blue.png'

	personnel = {
		sbmptc_id:this.teenCenter.id
	}
	personnels = []
	savePersonnel(){
		this.TeenCentersService.createPersonnel(this.personnel).subscribe(data => {
			this.UtilityService.setAlert(`New Personnel on ${this.teenCenter['name']} has been added`,'success')
			this.ngOnInit()
		})
	}

	retrievePersonnel(){
		this.TeenCentersService.retrivePersonnel(this.teenCenter.id).subscribe(data => {
			this.personnels = data
		})
	}

	updatePersonnel(personnel){
		this.TeenCentersService.updatePersonnel(personnel).subscribe(data => {
			this.UtilityService.setAlert(`${personnel.name} has been has been successfully updated `,'success')
			this.ngOnInit()
		})
	}

	deletePersonnel(personnel){
		this.TeenCentersService.deletePersonnel(personnel.id).subscribe(data => {
			this.UtilityService.setAlert(`${personnel.name} has been removed as a personnel on ${this.teenCenter['name']} `,'success')
			this.ngOnInit()
		})
	}












	customOptions: OwlOptions = {	
		center: true,
		items:2,
		loop:true,
		margin:0,
	   
		navSpeed: 700,
		autoplay:true,	
		autoplayTimeout:2000,
		responsive:{
			600:{
				items:1.3
			}
		}
	}

	hideShow(){
		this.TeenCentersService.setToHidden()
	}

}
