import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from './base-api.service'
import { Observable, Subject } from 'rxjs';

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
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();
	private reload = new Subject<any>();
	private multipleDelete = new Subject<any>();
	private actionToDelete = new Subject<any>();


	setActionToDelete(){
		this.actionToDelete.next()
	}

	getActionToDelete(){
		return this.actionToDelete.asObservable();
	}

	setMultipleDelete(array){
		this.multipleDelete.next(array);		
	}
	
	getMultipleDelete(){
		return this.multipleDelete.asObservable();
	}
	
	setReload(dummy){
		this.reload.next(dummy);		
	}
	
	getReload(){
		return this.reload.asObservable();
	}

	setPage(page) {
		this.page.next(page);			
	}

	getPage(){
		return this.page.asObservable();
	}


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


	search(keyword){
		const url = this.BaseAPIService.baseURL + '/search?field=fullname&value=' + keyword
		return this.http.get<any>(url,{headers:this.headers})
	}

}
