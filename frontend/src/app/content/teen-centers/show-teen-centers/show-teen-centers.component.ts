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

	ngOnInit(): void {

	}

	addPersnalInCharge = false

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
