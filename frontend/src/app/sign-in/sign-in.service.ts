import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
		const url = this.baseURL + '/register'		
		const body = JSON.stringify(data)		
		return this.http.post(url, body)
	}

	loginWithPin(credentials){
		const headers = {'X-Auth-Mode':'Pin'}
		const body = JSON.stringify(credentials)
		const url = this.baseURL + '/login'				
		return this.http.post(url, body, {headers:headers})
	}

	loginWithPassword(credentials){
		const headers = {'X-Auth-Mode':'Password'}
		const body = JSON.stringify(credentials)
		const url = this.baseURL + '/login'				
		return this.http.post(url, body, {headers:headers})
	}
	
}
