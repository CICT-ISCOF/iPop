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
		if(localStorage.getItem('user-data') && localStorage.getItem('user-data') != undefined){
			this.user = JSON.parse(localStorage.getItem('user-data'))
			this.token = this.user.token
		}
	 }

	user:any =  JSON.parse(localStorage.getItem('user-data'))
	token:any = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/activities'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();

	getProgramArea(){
		const url =	this.BaseAPIService.baseURL + '/program-areas'
		return this.http.get<any>(url ,{headers:this.headers})
	}
	
	updateProgramArea(activity, id){
		const url =	this.BaseAPIService.baseURL + '/program-areas/' + id
		return this.http.put<any>(url, activity ,{headers:this.headers})
	}


  
	createProgram(acitivity){
		const url = this.baseURL
		return this.http.post<any>(url,acitivity ,{headers:this.headers})
	}

	retrieveProgram(){
		const url = this.baseURL
		return this.http.get<any>(url ,{headers:this.headers})
	}

	updateProgram(acitivity, id){
		const url = this.baseURL + '/' + id
		return this.http.patch<any>(url, acitivity ,{headers:this.headers})
	}

	deleteProgram(id){
		const url = this.baseURL + '/' + id
		return this.http.delete<any>(url ,{headers:this.headers})
	}

	deletePhoto(id){
		const url = this.BaseAPIService.baseURL + '/awards/medias/' + id
		return this.http.delete<any>(url ,{headers:this.headers})
	}
}