import { UserService } from '../../others/user.service';
import { SlideService } from './slide.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as Others from '../others/others'
import { Modal } from 'src/app/modal/modal.service';

@Component({
  selector: 'app-dynamic-home',
  templateUrl: './dynamic-home.component.html',
  styleUrls: ['../header/home.component.scss','../header/home.component.inherit.cms.responsive.scss','../header/home.tablet.scss','../general-public/general-public.style.scss','./dynamic-home.component.scss']
})
export class DynamicHomeComponent implements OnInit {

    theme = localStorage.getItem( 'data-theme' )
    
    customOptions: OwlOptions = {
        center: true,
        items: 2,
        loop: true,
        margin: 0,

        navSpeed: 700,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
            600: {
                items: 1.3
            }
        }
    }
    
	constructor(
		private SlideService : SlideService,
        private UserService: UserService,
        private Modal: Modal

	) { 
        this.links = Others.links()
        this.Modal.isShowing().subscribe(()=>(this.ngOnInit()))
    }

	ngOnInit(): void {
		this.getSlide()
	}
    
    links = []

	isUser = !this.UserService.isUser()
    
    addImageModal(){
        this.Modal.show('Add Image','Add Slider Image')
    }
    
    editModal(){
        this.Modal.show('Edit Image','Delete Slider Images')
    }

	slides = []
	getSlide(){
		this.SlideService.retrieve().subscribe(data => {
			setTimeout(() => {
                this.slides = data
            }, 2000);
		})
	}

}
