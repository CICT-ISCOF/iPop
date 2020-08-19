import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from './base-api.service'


@Injectable({
  providedIn: 'root'
})
export class AdminService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/users'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
				})	

	getAdminLists(){	
		const url = this.baseURL + '/'
		return this.http.get<any>(url,{headers:this.headers})
	}

	paginateAdminList(page){
		const url = this.baseURL + '?page=' + page
		return this.http.get<any>(url,{headers:this.headers})
	}

	showAdmin(id){
		const url = this.baseURL + '/' + id
		return this.http.get<any>(url,{headers:this.headers})
	}

	blockorReactivate(request, id){
		const url = this.baseURL + '/' + id
		return this.http.put<any>(url,request,{headers:this.headers})
	}


	updateRole(request, id){
		const url = this.baseURL + '/' + id
		return this.http.put<any>(url,request,{headers:this.headers})
	}

	deleteAdmin(id){
		const url = this.baseURL + '/' + id
		return this.http.delete<any>(url,{headers:this.headers})
	}


}
