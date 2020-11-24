import { BaseAPIService } from './../../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AwardsService {

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

	baseURL = 	this.BaseAPIService.baseURL + '/awards'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();
  
	createAward(award){
		const url = this.baseURL
		return this.http.post<any>(url,award ,{headers:this.headers})
	}

	retrieveAwards(){
		const url = this.baseURL
		return this.http.get<any>(url ,{headers:this.headers})
	}

	updateAward(award, id){
		const url = this.baseURL + '/' +  id
		return this.http.patch<any>(url, award ,{headers:this.headers})
	}

	deleteAward(id){
		const url = this.baseURL + '/' +  id
		return this.http.delete<any>(url ,{headers:this.headers})
	}
}
