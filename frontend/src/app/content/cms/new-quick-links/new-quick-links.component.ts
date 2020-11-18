import { UtilityService } from './../../../utility.service';
import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service'
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-new-quick-links',
  templateUrl: './new-quick-links.component.html',
  styleUrls: ['./new-quick-links.component.scss']
})
export class NewQuickLinksComponent implements OnInit {

	constructor(
		private CmsService : CmsService,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {

	}

	src = '../../../../assets/avatars/girl-black.png'

	article ={
		files : [],
		title:'',
		body:''
	}

	imagesToRender = []

	readURL(files: FileList,event,index,type){	
		this.article.files = []
		if (event.target.files && event.target.files[0]) {	
			Object.keys(files).forEach(i => {				
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {	
					let img = (<FileReader>event.target).result		
					const toBase64Img = img.toString().split(',')	
					this.article.files.push( toBase64Img[1] )					
					this.imagesToRender.push( img )
				}					 						
			})	
		}	
	}
	

	triggerInput(){
		document.getElementById('quick-link-picture').click()
	}

	saveQuicLink(){
		this.CmsService.saveArticle(this.article).subscribe(data => {
			this.article ={
				files : [],
				title:'',
				body:''
			}
			this.UtilityService.setAlert('New Article will be posted soon!','success')
		})
	}

	
	customOptions: OwlOptions = {	
		center: true,
		items:2,
		loop:true,
		margin:0,
	   
		navSpeed: 700,
		autoplay:true,	
		autoplayTimeout:200000,
		responsive:{
			600:{
				items:1.3
			}
		}
	}

}
