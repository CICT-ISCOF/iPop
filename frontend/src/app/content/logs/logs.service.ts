import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../others/base-api.service'
import { Observable, Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class LogsService {

	constructor(
			private http : HttpClient,
			private BaseAPIService : BaseAPIService
		) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/logs'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
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




	getLogs(){
		return this.http.get<any>(this.baseURL,{headers:this.headers})
	}

	paginateLogs(page){
		const url = this.baseURL + '?page=' + page
		return this.http.get<any>(url,{headers:this.headers})	
	}

	searchLog(keyword){

	}

	deleteLog(id){

	}

}
