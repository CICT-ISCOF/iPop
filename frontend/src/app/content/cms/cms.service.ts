import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../others/base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = {}
	token = ''

	baseURL = 	this.BaseAPIService.baseURL 
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	
	private content = new Subject<any>();
	private preview = new Subject<any>();
	private category = new Subject<any>();

	setCategory(data){
		this.category.next(data)
	}
	getCategory(){
		return this.category.asObservable();
	}
	
	setPreview(boolean){
		this.preview.next(boolean)
	}

	getPreview(){
		return this.preview.asObservable();
	}

	setData(data){
		this.content.next(data)
	}

	getData(){
		return this.content.asObservable();
	}

	save(content){
		const url = this.baseURL + '/cms/array'				
		return this.http.post(url, content, {headers:this.getHeaders()})
	}

	getLinks(){
		const url = this.baseURL + '/cms/links'	
		return this.http.get(url, {headers:this.getHeaders()})		
	}


	saveQuickLinks(data){
		const url = this.baseURL + '/cms/quick-links'				
		return this.http.post(url, data, {headers:this.getHeaders()} )
	}

	setChild(data){
		const url = this.baseURL + '/cms/links/children'
		return this.http.post(url, data, {headers:this.getHeaders()} )
	}
	
	// ---------------new--------------------

	saveArticle(data){
		const url = this.baseURL + '/articles'				
		return this.http.post(url, data, {headers:this.getHeaders()} )
	}

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user['token']
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}
 
}
