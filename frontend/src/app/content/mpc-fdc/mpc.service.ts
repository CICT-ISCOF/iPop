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

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/mpcfdc-teams'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	  private show = new Subject<any>();
	  private mpc = new Subject<any>();

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user.token	
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}


	setMPC(mpc){
		console.log(mpc)
		this.mpc.next(mpc)
	}

	getMPC(){
		return this.mpc.asObservable()
	}

  	setToHidden(){
		this.show.next(false)
	}

	triggerListener(){
		return this.show.asObservable();
	}


	// --------------MPC FDC TEAM-----------------


	create(data){
		const url = this.baseURL
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	} 
	retrieve(){
		const url = this.baseURL
		return this.http.get<any>(url)
	}
	update(id,data){
		const url = this.baseURL + '/' + id
		return this.http.patch<any>(url,data ,{headers:this.getHeaders()})
	} 
	deleteTeam(id){
		const url = this.baseURL + '/' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}
	

	// --------MPC----------


	createMPC(data){
		const url = this.BaseAPIService.baseURL + '/mpcfdcs'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	} 
	retrieveMPC(data){
		const url = this.BaseAPIService.baseURL + `/mpcfdcs?municipality=${data.municipality}&district=${data.district}`
		return this.http.get<any>(url )
	} 
	showMPC( id ){
		const url = this.BaseAPIService.baseURL + '/mpcfdcs/' + id 
		return this.http.get<any>(url )
	} 
	updateMPC(data){
		const url = this.BaseAPIService.baseURL + '/mpcfdcs/' + data['id']
		return this.http.patch<any>(url,data ,{headers:this.getHeaders()})
		
	} 
	deleteMPC(id){
		const url = this.BaseAPIService.baseURL + '/mpcfdcs/' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}



	// -------- personnels ===========

	createPersonnel(data){
		const url = this.BaseAPIService.baseURL + '/pmc-personel'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	} 

	retrivePersonnel(id){
		const url = this.BaseAPIService.baseURL + `/pmc-personel?mpcfdc_id=${id}`
		return this.http.get<any>(url )
	} 

	updatePersonnel(data){
		const url = this.BaseAPIService.baseURL + '/pmc-personel/' + data['id']
		return this.http.patch<any>(url ,data,{headers:this.getHeaders()})
	} 


	deletePersonnel(id){
		const url = this.BaseAPIService.baseURL + '/pmc-personel' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}

	


}
