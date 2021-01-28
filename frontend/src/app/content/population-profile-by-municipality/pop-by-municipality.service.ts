import { BaseAPIService } from './../../base-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopByMunicipalityService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		
	} 

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/statistic-profiles/by-municipality'
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


	getSummary(){
		const url = this.baseURL
		return this.http.get(url)
	}


}
