import { BaseAPIService } from '../../../others/base-api.service';
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
		
	}

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/awards'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user.token	
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}
  
	createAward(award){
		const url = this.baseURL
		return this.http.post<any>(url,award ,{headers:this.getHeaders()})
	}

	retrieveAwards(){
		const url = this.baseURL
		return this.http.get<any>(url )
	}

	updateAward(award, id){
		const url = this.baseURL + '/' +  id
		return this.http.patch<any>(url, award ,{headers:this.getHeaders()})
	}

	deleteAward(id){
		const url = this.baseURL + '/' +  id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}

	deletePhoto(id){
		const url = this.BaseAPIService.baseURL + '/awards/medias/' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}
}
