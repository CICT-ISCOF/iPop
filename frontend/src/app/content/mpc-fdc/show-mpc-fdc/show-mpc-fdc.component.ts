import { MpcService } from './../mpc.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-show-mpc-fdc',
  templateUrl: './show-mpc-fdc.component.html',
  styleUrls: ['./show-mpc-fdc.component.scss']
})
export class ShowMpcFdcComponent implements OnInit {

	constructor(
		private MpcService : MpcService
	) { }

	ngOnInit(): void {
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
		this.MpcService.setToHidden()
	}

}