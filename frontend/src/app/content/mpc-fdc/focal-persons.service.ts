import { BaseAPIService } from './../../base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FocalPersonsService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user:any = ''
	token:any = ''
	baseURL:any = 	this.BaseAPIService.baseURL + '/sbmptcs-focal-persons'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user.token	
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}

	create(data){
		const url = this.baseURL
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieve(){
		const url = this.baseURL
		return this.http.get<any>(url)
	}

	update(data){
		const url = this.baseURL + `/${data['id']}`
		return this.http.patch<any>(url,data ,{headers:this.getHeaders()})
	} 

	deleteFocalPerson(id){
		const url = this.baseURL + `/` + id
		return this.http.delete<any>(url,{headers:this.getHeaders()})
	}
}
