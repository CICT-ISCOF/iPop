import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dynamic-home',
  templateUrl: './dynamic-home.component.html',
  styleUrls: ['./dynamic-home.component.scss','../home/home.component.scss','../home/home.component.inherit.cms.responsive.scss','../home/home.tablet.scss','../general-public/general-public.style.scss']
})
export class DynamicHomeComponent implements OnInit {

  constructor() { }

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

}
