import { BaseAPIService } from './../../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class BirthStatService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		
	}

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/birth-statistics'
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


	create (data){
		const url = this.baseURL
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieve (){
		const url = this.baseURL
		return this.http.get<any>(url ,{headers:this.getHeaders()})
	}

	update(data, id){
		const url = this.baseURL + '/' +  id
		return this.http.patch<any>(url,data ,{headers:this.getHeaders()})
	}
	
	deleteBirthStat(id){
		const url = this.baseURL + '/' +  id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}

	show(data){
		const url =  this.baseURL + '/' + data
		return this.http.get<any>(url ,{headers:this.getHeaders()})
	}
}
