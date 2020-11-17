import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../.././base-api.service'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeaturedArticlesService {

  	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { 

	}

	

	baseURL = 	this.BaseAPIService.baseURL 
	

	  private show = new Subject<any>();
	  private article = new Subject<any>();

  	setToHidden(){
		this.show.next(false)		
	}

	triggerListener(){
		return this.show.asObservable();
	}

	passArticle(article){
		this.article.next(article)		
		
	}

	getArticle(){
		
		return this.article.asObservable();
		
	}

	getFeautredArticles(){
		const url = this.baseURL + '/articles'
		return this.http.get(url)
	}
}
 