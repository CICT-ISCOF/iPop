import { FeaturedArticlesService } from './../featured-articles.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {

	constructor(
		private FeaturedArticlesService : FeaturedArticlesService
	) { }

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

	back(){
		this.FeaturedArticlesService.setToHidden()
	}

}
