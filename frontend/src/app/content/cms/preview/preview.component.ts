import { Component, OnInit , OnDestroy } from '@angular/core';
import { CmsService } from '../cms.service'
import { Subscription } from 'rxjs'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations'

@Component({
	selector: 'app-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss','preview.component.inherit.responsive.scss','preview.component.inherit.responsive.scss','../../header/home.component.inherit.cms.responsive.scss'],
	animations: [
		trigger('listAnimation', [
			transition('* => *',[
				query(':enter', style({opacity:0}),{optional:true}),

				query(':enter', stagger('300ms',[
					animate('.6s ease-in', keyframes([
						style({opacity:0,transform: 'translateX(75%)', offset:0}),
						style({opacity:.5,transform: 'translateX(30px%)', offset:0.3}),
						style({opacity:1,transform: 'translateX(0)', offset:1})
					]))
				]))
			])
		]),
		trigger('quickLinksAnimation', [
			transition('* => *',[
				query(':enter', [
					stagger(3000, [
						animate('.3s ease-in', keyframes([
							style({opacity:0,transform: 'translateX(-25px)', offset:0}),
							style({opacity:.5,transform: 'translateX(-10px)', offset:0.3}),
							style({opacity:1,transform: 'translateX(0)', offset:1})
						]))
					]),
				], { optional: true }),
				query(':leave', [
					stagger(3000, [
						animate('.2s ease-in', keyframes([	
							style({opacity:1,transform: 'translateX(0)', offset:0}),
							style({opacity:.5,transform: 'translateX(-50px)', offset:0.3}),
							style({opacity:0,transform: 'translateX(-100%)', offset:1}),
						]))
					]),
				], { optional: true })
			]),
		  ])
		]
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
