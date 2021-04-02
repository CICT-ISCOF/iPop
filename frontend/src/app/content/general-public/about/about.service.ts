import { BaseAPIService } from '../../../others/base-api.service';
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
		
	 }

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/charts'
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

	storeOrganizationalStructure(file){
		const url = this.baseURL
		return this.http.post<any>(url, file , {headers:this.getHeaders()})
	}

	getOrganizationalStructure(){
		const url = this.baseURL 
		return this.http.get<any>(url)
	}

	updateOrganizationalStructure(file){
		const url = this.baseURL 
		return this.http.put<any>(url, file ,{headers:this.getHeaders()})
	}
}
