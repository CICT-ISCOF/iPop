import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'


@Injectable({
  providedIn: 'root'
})
export class AccountService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/users/'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
				})	

	

	setUpSecurityQuestionAndPin(data, id){	
		const url = this.baseURL + id
		return this.http.put(url,data,{headers:this.headers})
	}

	changeSecurityQuestion(data, id){
		const url = this.baseURL + id
		return this.http.put(url,data,{headers:this.headers})
	}


	changePin(data, id){
		const url = this.baseURL + id
		return this.http.put(url,data,{headers:this.headers})
	}

	changePassword(data, id){
		const url = this.baseURL + id
		return this.http.put(url,data,{headers:this.headers})
	}
}
 