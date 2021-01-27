import { BaseAPIService } from './../../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MigrationStatService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		
	}

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/migration-statistics'
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


	create (data){
		const url = this.baseURL
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieve (){
		const url = this.baseURL
		return this.http.get<any>(url ,{headers:this.getHeaders()})
	}

	update(data, id){
		const url = this.baseURL + '/' +  id
		return this.http.patch<any>(url,data ,{headers:this.getHeaders()})
	}
	
	deleteBirthStat(id){
		const url = this.baseURL + '/' +  id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}

	showData(municipality, barangay, year, gender){
		const url =  this.baseURL + `?municipality=${municipality}&barangay=${barangay}&year=${year}`
		return this.http.get<any>(url ,{headers:this.getHeaders()})
	}


	postToMOnthController(data){
		const url = this.BaseAPIService.baseURL + '/month-charts'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	postToinsidence(data){		
		const url = this.BaseAPIService.baseURL + '/incidences'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	getSummary(){		
		const url = this.BaseAPIService.baseURL + '/migration-statistics/summary'
		return this.http.get<any>(url)
	}

}
