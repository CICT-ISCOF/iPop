import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../.././base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MpcService {

  	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/users'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

  	private show = new Subject<any>();

  	setToHidden(){
		this.show.next(false)
	}

	triggerListener(){
		return this.show.asObservable();
	}
  

}
