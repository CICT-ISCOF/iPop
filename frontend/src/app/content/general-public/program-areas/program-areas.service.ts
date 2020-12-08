import { BaseAPIService } from './../../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramAreasService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		
	 }

	user:any =  ''
	token:any =''

	baseURL = 	this.BaseAPIService.baseURL + '/activities'


	private page = new Subject<any>();

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user.token	
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	};

	getProgramArea(){
		const url =	this.BaseAPIService.baseURL + '/program-areas'
		return this.http.get<any>(url)
	}
	
	updateProgramArea(activity, id){
		const url =	this.BaseAPIService.baseURL + '/program-areas/' + id
		return this.http.put<any>(url, activity ,{headers:this.getHeaders()})
	}


  
	createProgram(acitivity){
		const url = this.baseURL
		return this.http.post<any>(url,acitivity ,{headers:this.getHeaders()})
	}

	retrieveProgram(){
		const url = this.baseURL
		return this.http.get<any>(url ,{headers:this.getHeaders()})
	}

	updateProgram(acitivity, id){
		const url = this.baseURL + '/' + id
		return this.http.patch<any>(url, acitivity ,{headers:this.getHeaders()})
	}

	deleteProgram(id){
		const url = this.baseURL + '/' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}

	deletePhoto(id){
		const url = this.BaseAPIService.baseURL + '/program-areas/activity-files/' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}
}