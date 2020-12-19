import { BaseAPIService } from './../../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesOfferedService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		if(localStorage.getItem('user-data') && localStorage.getItem('user-data') != undefined){
			this.user = JSON.parse(localStorage.getItem('user-data'))
			this.token = this.user.token
		}
	 }

	user:any =''
	token:any =''

	baseURL = 	this.BaseAPIService.baseURL + '/services'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();

	
	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user.token	
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}

	create(string){
		const url = this.BaseAPIService.baseURL + '/service-offers'
		return this.http.post<any>(url, string,{headers:this.	getHeaders()} )
	}

	retrieve(id){
		const url = this.baseURL + '/' + id
		return this.http.get<any>(url)
	}

	update(string, id){
		const url = this.BaseAPIService.baseURL + '/service-offers/' + id
		return this.http.put<any>(url, string ,{headers:this.	getHeaders()})
	}

	delete(id){
		const url = this.BaseAPIService.baseURL + '/service-offers/' + id
		return this.http.delete<any>(url ,{headers:this.	getHeaders()})
	}
}
