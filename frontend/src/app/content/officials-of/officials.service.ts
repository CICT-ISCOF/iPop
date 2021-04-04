import { Subject } from 'rxjs';
import { BaseAPIService } from '../../others/base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OfficialsService1 {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService,
	
	) { }

	private trigger = new Subject()

	setTrigger(){
		this.trigger.next()
	}
	
	listen(){
		return this.trigger.asObservable()
	}



	user:any = {}
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/officials'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user['token']
		console.log(this.user)
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}
	
	createMuncipalOfficials(data){
		const url = this.baseURL + `/municipalities`
		return this.http.post<any>(url, data , {headers:this.getHeaders()})

	} 

	retieveMuncipalOfficials(municipality){
		const url = this.baseURL + `/municipalities?municipality=${municipality}`
		return this.http.get<any>(url)
	} 

	updateMuncipalOfficials(data){
		const url = this.baseURL + `/municipalities/${data['id']}`
		return this.http.patch<any>(url, data, {headers:this.getHeaders()})
	} 

	deleteMuncipalOfficials(id){
		const url = this.baseURL + `/municipalities/${id}`
		return this.http.delete<any>(url, {headers:this.getHeaders()})
	} 




	createBarangaylOfficials(data){
		const url = this.baseURL + `/barangays`
		return this.http.post<any>(url, data ,{headers:this.getHeaders()})
	} 

	retieveBarangayOfficials(barangay){
		const url = this.baseURL + `/barangays?barangay=${barangay}`
		return this.http.get<any>(url)
	} 

	updateBarangayOfficials(data){
		const url = this.baseURL + `/barangays/${data.id}`
		return this.http.patch<any>(url,data, {headers:this.getHeaders()})
	} 

	deleteBarangayOfficials(id){
		const url = this.baseURL + `/barangays/${id}`
		return this.http.delete<any>(url, {headers:this.getHeaders()})
	} 


}
