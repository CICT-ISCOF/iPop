import { Subscription } from 'rxjs';
import { FeaturedArticlesService } from './../featured-articles.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {

	constructor(
		private FeaturedArticlesService : FeaturedArticlesService
	) { 
		
	}

	nl2br (str, is_xhtml) {
		if (typeof str === 'undefined' || str === null) {
			return '';
		}
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}

	subscription : Subscription
	
	ngOnInit(): void {
		this.article = JSON.parse(localStorage.getItem('article'))
		console.log(this.article)
		
		// console.log(JSON.parse(localStorage.getItem('article-photos')))
	}

	
	article : any = {
		title:'wew',
		photos:[]
	}

	photos:any = [{uri:''}]

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

	back(){
		this.FeaturedArticlesService.setToHidden()
	}

}
