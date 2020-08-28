import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../base-api.service'

@Injectable({
  providedIn: 'root'
})
export class SignInService {

 	 constructor(
		  private http : HttpClient,
		  private BaseAPIService : BaseAPIService
	  ) { }
	
	baseURL = this.BaseAPIService.baseURL + '/auth'

	
	
	register(data){
		const user = JSON.parse(localStorage.getItem('user-data'))
		const token = user.token
		const headers = 	new HttpHeaders({
		'Accept':'application/json',
		'Authorization' : 'Bearer '+ token
	})	
		const url = this.baseURL + '/register'			
		return this.http.post(url, data, {headers:headers})
	}

	loginWithPin(credentials){
		const headers = new HttpHeaders({'X-Auth-Mode':'Pin',
		'Accept':'application/json'})	
		const url = this.baseURL + '/login'				
		return this.http.post(url, credentials, {headers:headers})
	}

	loginWithPassword(credentials){
		const headers =  new HttpHeaders({'X-Auth-Mode':'Password',
		'Accept':'application/json'})	
		const url = this.baseURL + '/login'				
		return this.http.post(url, credentials, {headers:headers})
	}

	visit(){
		const url = this.BaseAPIService.baseURL + '/logs/visit'
		return this.http.options(url)
	}
	
}
