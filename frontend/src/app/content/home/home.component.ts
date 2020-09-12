import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','home.component.inherit.cms.responsive.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  role = localStorage.getItem('role')

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
