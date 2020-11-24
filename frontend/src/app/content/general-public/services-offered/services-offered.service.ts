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

	user:any = JSON.parse(localStorage.getItem('user-data'))
	token:any = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/services'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();

	create(string){
		const url = this.BaseAPIService.baseURL + '/service-offers'
		return this.http.post<any>(url, string , {headers:this.headers})
	}

	retrieve(id){
		const url = this.baseURL + '/' + id
		return this.http.get<any>(url,{headers:this.headers})
	}

	update(string, id){
		const url = this.BaseAPIService.baseURL + '/service-offers/' + id
		return this.http.put<any>(url, string ,{headers:this.headers})
	}

	delete(id){
		const url = this.BaseAPIService.baseURL + '/service-offers/' + id
		return this.http.delete<any>(url ,{headers:this.headers})
	}
}
