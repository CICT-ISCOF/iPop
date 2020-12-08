import { SlideService } from './slide.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dynamic-home',
  templateUrl: './dynamic-home.component.html',
  styleUrls: ['./dynamic-home.component.scss','../home/home.component.scss','../home/home.component.inherit.cms.responsive.scss','../home/home.tablet.scss','../general-public/general-public.style.scss']
})
export class DynamicHomeComponent implements OnInit {

	constructor(
		private SlideService : SlideService
	) { }

	ngOnInit(): void {
		this.getSlide()
	}

	wantsToadAnImage = false

	newImages = []

	triggerImage(){
		this.wantsToadAnImage = true
		document.getElementById('slider').click()
	}
	clearSlider(){
		this.newImages = []
	}

	readURL(files: FileList,event,type){	
		this.clearSlider()
		if (event.target.files && event.target.files[0]) {	
			Object.keys(files).forEach(i => {				
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {	
					let img = (<FileReader>event.target).result		
					const toBase64Img = img.toString().split(',')
					if(type == 'video'){		
						this.newImages.push(img ) 															
					}	
					else{	
						this.newImages.push(img) 	
					}
				}	
			})	
		}			
	}

	slide = []
	getSlide(){
		this.SlideService.retrieve().subscribe(data => {
			this.slide = data
		})
	}

	save(){
		let data = {}
		data['photos'] = this.newImages
		this.SlideService.create(data).subscribe(data => {
			this.clearSlider()
			this.wantsToadAnImage = false
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

}
