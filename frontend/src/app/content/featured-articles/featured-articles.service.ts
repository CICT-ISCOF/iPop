import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../others/base-api.service'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeaturedArticlesService {

  	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }
	
	baseURL = 	this.BaseAPIService.baseURL 
	
    private show = new Subject<any>();
    private article = new Subject<any>();
    
    
    getHeaders(){
		let user = JSON.parse(localStorage.getItem('user-data'))
		let token = user.token	
		return new HttpHeaders({
			'Accept':'application/json',
            'Authorization': 'Bearer ' + token,
			'Content-Type':[]
		})	
	}

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
    
    deleteArticle(id){
        const url = this.baseURL + '/articles/' + id
        return this.http.delete( url, { headers: this.getHeaders()})
    }
}
 