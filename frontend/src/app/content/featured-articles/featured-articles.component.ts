import { FeaturedArticlesService } from './featured-articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-articles',
  templateUrl: './featured-articles.component.html',
  styleUrls: ['./featured-articles.component.scss']
})
export class FeaturedArticlesComponent implements OnInit {

	constructor(
		private FeaturedArticlesService : FeaturedArticlesService
	) { 
		this.FeaturedArticlesService.triggerListener().subscribe(value =>{
			this.show = value
		})
	}

	ngOnInit(): void {

	}

	show = false

	showArticle(){
		this.show = true
	}

}
