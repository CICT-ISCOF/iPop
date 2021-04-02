import { BaseAPIService } from '../../others/base-api.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficialsService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		
	}

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/provincial-officials'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private officials = new Subject<any>();

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user.token	
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}

	setOfficialsFilter(filter){
		const url = ""  + `?municipality=${filter['municipality']}&barangay=${filter['barangay']}&year=${filter['year']}`
		const officials = this.http.get(url)
		this.officials.next(officials)
	}

	getOfficialsFilter(){
		return this.officials
	}



	getOfficials(){
		const url  = this.baseURL
		return this.http.get<any>(url)
	}

	storeOfficials(officials){
		const url  = this.baseURL
		return this.http.post<any>(url,officials ,{headers:this.getHeaders()})
	}

	updateOfficial(id, official ){
		const url = this.baseURL + '/' +  id
		return this.http.patch<any>(url, official ,{headers:this.getHeaders()})
	}

	deleteOfficial(id ){
		const url = this.baseURL + '/' +  id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}


	// ----------------sb members --------------------

	sbMemberUrl = this.BaseAPIService.baseURL + '/sb-members'

	create(officials){
		const url  = this.sbMemberUrl
		return this.http.post<any>(url,officials ,{headers:this.getHeaders()})
	}

	retrieve(){
		const url  = this.sbMemberUrl
		return this.http.get<any>(url)
	}

	update(id, member){
		const url = this.sbMemberUrl + '/' +  id
		return this.http.put<any>(url,member ,{headers:this.getHeaders()})
	}

	deleteSB(id){
		const url = this.sbMemberUrl + '/' +  id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}


}
 