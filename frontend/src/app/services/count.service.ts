import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../others/base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/counts'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

			
	getOverlAllCount(){
		const url = this.baseURL
		return this.http.get<any>(url,{headers:this.headers})		
	}

	getRecordCount(type){
		const url = this.baseURL + '/type?type=' + type
		return this.http.get<any>(url,{headers:this.headers})			
	}
}
