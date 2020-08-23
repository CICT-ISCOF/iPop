import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CpdbService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/cpdb'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
				})	
	
				
	private data = new Subject<any>();
	private reload = new Subject<any>();
	private array = new Subject<any>();
	private actionToDelete = new Subject<any>();


	setActionToDelete(){
		this.actionToDelete.next()
	}

	getActionToDelete(){
		return this.actionToDelete.asObservable();
	}

	
	setReload(){
		this.reload.next();		
	}
	
	getReload(){
		return this.reload.asObservable();
	}



	setMultipleDelete(array){
		this.array.next(array)
	}

	getMultipleDelete(){
		return this.array.asObservable();
	}	
	

	setData(data){
		this.data.next(data)
	}

	getData(){
		return this.data.asObservable();
	}	
	
	getCPDBLists(){
		const url = this.baseURL  		
		return this.http.get<any>(url, {headers:this.headers})
	}

	saveCPDPB(data){
		const url = this.baseURL 		
		return this.http.post(url, data, {headers:this.headers})
	}
	
	paginateAdminList(page){
		const url = this.baseURL + '?page=' + page
		return this.http.get<any>(url,{headers:this.headers})
	}

	deleteCPDB(id){	
		const url = this.baseURL + '/' + id 		
		return this.http.delete<any>(url, {headers:this.headers})
	}

	
	
}
