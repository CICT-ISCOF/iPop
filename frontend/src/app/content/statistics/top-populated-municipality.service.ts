import { Injectable } from '@angular/core';
import { OfficialsService } from './../provincial-officials/officials.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'

@Injectable({
  providedIn: 'root'
})
export class TopPopulatedMunicipalityService {

 
	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService,
	
	) { }

	user = {}
	token = ''

	baseURL = this.BaseAPIService.baseURL + '/top-populations'

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user['token']
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}

	create(data){
		const url  = this.baseURL
		return this.http.post(url,data, {headers:this.getHeaders()})
	} 

	retrieve(){
		const url  = this.baseURL
		return this.http.get(url, {headers:this.getHeaders()})
	} 

	update(data){
		const url  = this.baseURL + `/${data['id']}`
		return this.http.patch(url,data, {headers:this.getHeaders()})
	} 

	deleteData(id){
		const url  = this.baseURL + `/${id}`
		return this.http.delete(url, {headers:this.getHeaders()})
	}
	
}
