import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor() { 
		
	}

	isUser(){
		if(localStorage.getItem('user-data') && localStorage.getItem('user-data') != undefined){
			return true
		}
		return false
	}
	
}
