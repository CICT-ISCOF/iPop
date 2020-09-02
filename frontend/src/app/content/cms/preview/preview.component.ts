import { Component, OnInit , OnDestroy } from '@angular/core';
import { CmsService } from '../cms.service'
import { Subscription } from 'rxjs'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit  {

	constructor(
		private DomSanitizer : DomSanitizer,
		private CmsService : CmsService
	) {		
		this.subscription = this.CmsService.getData().subscribe(data=>{
			this.items = data
			this.isLoading = false		
			this.subscription.unsubscribe()
		})

		this. categorySubscription = this.CmsService.getCategory().subscribe(data=>{
			this.categories = data
			console.log(data)
			this.isLoading = false		
			this.categorySubscription.unsubscribe()
		})
	}

	isLoading = true
	subscription:Subscription
	categorySubscription :  Subscription
	items:any = []

	cleanURL(oldURL: string): SafeResourceUrl {
		return this.DomSanitizer.bypassSecurityTrustResourceUrl(oldURL);
	}


	categories:any = {
		title:'',
		subcategory:''
	}


	ngOnInit(){
		
	}

	ngOnDestroy(){
		this.subscription.unsubscribe()
		
	}



	closePreview(){
		this.CmsService.setPreview(false)
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
