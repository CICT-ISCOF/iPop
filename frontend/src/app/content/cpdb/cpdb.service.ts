import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'


@Injectable({
    providedIn: 'root'
})
export class CpdbService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL 
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
				})	
	
	saveCPDPB(data){
		const url = this.baseURL + '/cpdb'		
		return this.http.post(url, data, {headers:this.headers})
	}
	
}
