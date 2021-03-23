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
		this.getFeautredArticles()
	}

	articles :any = []

	getFeautredArticles(){
		this.FeaturedArticlesService.getFeautredArticles().subscribe(data => {
			this.articles = data
		})
	}

	show = false

	showArticle(article){
		this.show = true
		localStorage.setItem('article',JSON.stringify(article))		
	}

	tuncateString (string) {		
		const length = 900;	
		const ending = '...';	
		return string.substring(0, length - ending.length) + ending;
    }
    
    deleteArticle( id) {
        this.FeaturedArticlesService.deleteArticle( id ).subscribe( data => {
            this.ngOnInit()
        } )
    }
	

}
