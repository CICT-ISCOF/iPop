import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

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
		const url = this.baseURL + '/links'				
		return this.http.post(url, content, {headers:this.headers})
	}


}