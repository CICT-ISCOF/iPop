import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../others/base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeathsService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/deaths'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token
				})	

	
	private data = new Subject<any>()
	private reload = new Subject<any>()
	private array = new Subject<any>()
	private actionToDelete = new Subject<any>()
	private row = new Subject<any>()

	setRow(){
		this.row.next()
	}

	getRow(){
		return this.row.asObservable();
	}
	
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

	getDeathLists(){
		const url = this.baseURL 		
		return this.http.get<any>(url, {headers:this.headers})
	}

	getSpecificRecord(id){
		const url = this.baseURL + '/' + id		
		return this.http.get<any>(url, {headers:this.headers})
	}



	saveDeathRecord(record){
		const url = this.baseURL 		
		return this.http.post(url, record, {headers:this.headers})
	}	
	
	
	paginateAdminList(page){
		const url = this.baseURL + '?page=' + page
		return this.http.get<any>(url,{headers:this.headers})
	}

	deleteRecord(id){		
		const url = this.baseURL + '/' + id 		
		return this.http.delete<any>(url, {headers:this.headers})
	}

	
	updateStatus(status,id){
		const url = this.BaseAPIService.baseURL + '/records/' + id
		return this.http.put(url, {status:status},{ headers:this.headers})
	}

	updateRecord(record,id){
		const url = this.baseURL + '/' + id 		
		return this.http.put(url, record,{ headers:this.headers})

	}

	addComment(data){
		const url = this.BaseAPIService.baseURL + '/comments'
		return this.http.post(url, data, {headers:this.headers})
	}

	removeComment(id){
		const url = this.BaseAPIService.baseURL + '/comments/' + id 		
		return this.http.delete(url,{ headers:this.headers})

	}

	search(keyword){
		const url = this.BaseAPIService.baseURL + '/search/records?type=Death&paginate=true&query=' + keyword
		return this.http.get<any>(url,{headers:this.headers})
	}

	
	getSearched(keyword){
		const url = this.BaseAPIService.baseURL + '/search/records?type=Death&query=' + keyword
		return this.http.get<any>(url,{headers:this.headers})
	}

	paginateSearch(page,keyword){
		const url =  this.BaseAPIService.baseURL + '/search/records?type=Death&query='+ keyword +'&page=' + page
		return this.http.get<any>(url,{headers:this.headers})
	}

}
