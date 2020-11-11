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
		private CmsService : CmsService
	) { }

	ngOnInit(): void {

	}

	src = '../../../../assets/avatars/girl-black.png'

	readURL(file,event){

	}

	data = {
		title:'',
		body:'',
		file:''
	}

	triggerInput(){
		document.getElementById('quick-link-picture').click()
	}

	saveQuicLink(){
		this.CmsService.saveQuickLinks(this.data).subscribe(data => {
			console.log(data)
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
