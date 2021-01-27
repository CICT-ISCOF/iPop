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
		private TeenCentersService : TeenCentersService
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
		Object.keys(files).forEach(i => {				
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[i]);   		     
			reader.onload = (event) => {	
				this.teenCenter['files'].push( (<FileReader>event.target).result		)
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
