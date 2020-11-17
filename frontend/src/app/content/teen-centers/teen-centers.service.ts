import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../.././base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeenCentersService {

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

	baseURL = 	this.BaseAPIService.baseURL + '/sbmptcs'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	  private show = new Subject<any>();
	  private add = new Subject<any>();

  	setToHidden(){
		this.show.next(false)		
	}

	triggerListener(){
		return this.show.asObservable();
	}

	addNewTeenCenter(value){
		this.add.next(value)		
	}

	backListener(){
		return this.add.asObservable();
	}

	getTeenCenters(){
		const url = this.baseURL
		return this.http.get<any>(url , {headers:this.headers})
	}

	addTeencenter(teenCenter){
		const url = this.baseURL
		return this.http.post<any>(url, teenCenter , {headers:this.headers})
	}
}
