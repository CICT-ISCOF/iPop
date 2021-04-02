import { UserService } from './../../user.service';
import { UtilityService } from './../../utility.service';
import { SlideService } from './slide.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2' 
import * as Others from '../others/others'

@Component({
  selector: 'app-dynamic-home',
  templateUrl: './dynamic-home.component.html',
  styleUrls: ['../home/home.component.scss','../home/home.component.inherit.cms.responsive.scss','../home/home.tablet.scss','../general-public/general-public.style.scss','./dynamic-home.component.scss']
})
export class DynamicHomeComponent implements OnInit {

	theme = localStorage.getItem('data-theme')
	constructor(
		private SlideService : SlideService,
		private UtilityService : UtilityService,
		private UserService : UserService
	) { 
       this.links = Others.links()
    }

	ngOnInit(): void {
		this.getSlide()
	}
    
    links = []

	isUser = !this.UserService.isUser()

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

	slides = []
	getSlide(){
		this.SlideService.retrieve().subscribe(data => {
			setTimeout(() => {
                this.slides = data
            }, 2000);
		})
	}

	wantsToEdit = false

	editSlider(){
		this.wantsToEdit = true
	}

	save(){
		let data = {}
		data['photos'] = this.newImages
		this.SlideService.create(data).subscribe(data => {
			this.UtilityService.setAlert('Added an Images to slider', 'success')
			this.clearSlider()
			this.wantsToadAnImage = false
			this.ngOnInit()
		})	
	}

	deletePhoto(id){		
		Swal.fire({
			title: 'Are you sure you want to delete this photo?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Later'
		  }).then((result) => {
			if (result.value) {
				this.SlideService.deletePhoto(id).subscribe(data => {
					this.UtilityService.setAlert('Photo has been deleted','info')
					this.ngOnInit()
				})
			}
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
