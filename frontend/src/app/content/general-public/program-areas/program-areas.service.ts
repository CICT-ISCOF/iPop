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

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/users'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();
  
	createProgram(award){
		const url = this.baseURL
		return this.http.post<any>(url,award ,{headers:this.headers})
	}

	retrieveProgram(){
		const url = this.baseURL
		return this.http.get<any>(url ,{headers:this.headers})
	}

	updateProgram(program, id){
		const url = this.baseURL + id
		return this.http.patch<any>(url, program ,{headers:this.headers})
	}

	deleteProgram(id){
		const url = this.baseURL + id
		return this.http.delete<any>(url ,{headers:this.headers})
	}
}