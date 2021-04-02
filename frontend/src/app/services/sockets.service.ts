import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../base-api.service'
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { 
		// this.socket = io('http://localhost:5000');
	}

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/sockets'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	
	
	socket:any

	
	getAll(){
		const url = this.baseURL   + '/all'
		return this.http.get<any>(url,{headers:this.headers})		
	}

	getComments(){
		const url = this.baseURL + '/comments'
		return this.http.get<any>(url,{headers:this.headers})		
	}
		

	getRecord(){
		const url = this.baseURL + '/record'
		return this.http.get<any>(url,{headers:this.headers})		
	}

	// // EMITTER
	// sendMessage(msg: string) {
	// 	this.socket.emit('sendMessage', { message: msg });
	// }

	// HANDLER
	onNewMessage() {
		return Observable.create(observer => {
			this.socket.on('newMescomment.record.1', msg => {
				observer.next(msg);
			});
		});
	}
		
			

}
