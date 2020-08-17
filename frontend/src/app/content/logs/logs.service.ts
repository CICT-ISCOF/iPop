import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../.././base-api.service'

@Injectable({
  providedIn: 'root'
})
export class LogsService {

	constructor(
			private http : HttpClient,
			private BaseAPIService : BaseAPIService
		) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/logs'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
				})	

	getLogs(){
		return this.http.get<any>(this.baseURL,{headers:this.headers})
	}

	paginateLogs(page){
		const url = this.baseURL + '?page=' + page
		return this.http.get<any>(url,{headers:this.headers})	
	}

	searchLog(keyword){

	}

	deleteLog(id){

	}

}
