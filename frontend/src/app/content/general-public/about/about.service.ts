import { BaseAPIService } from './../../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		if(localStorage.getItem('user-data') && localStorage.getItem('user-data') != undefined){
			this.user = JSON.parse(localStorage.getItem('user-data'))
			this.token = this.user.token
		}
	 }

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/users'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();

	storeOrganizationalStructure(file){
		const url = this.baseURL
		return this.http.post<any>(url, file , {headers:this.headers})
	}

	getOrganizationalStructure(){
		const url = this.baseURL 
		return this.http.get<any>(url)
	}

	updateOrganizationalStructure(file){
		const url = this.baseURL 
		return this.http.put<any>(url, file ,{headers:this.headers})
	}
}
