import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../.././base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BirthsService {

 
	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/births'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
        })	
        
  saveBirthRecord(record){
    const url = this.baseURL 		
		return this.http.post(url, record, {headers:this.headers})
  }

}
