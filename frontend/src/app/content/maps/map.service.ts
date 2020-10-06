import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { 
		if(localStorage.getItem('user-data') && localStorage.getItem('user-data') != undefined){
			this.user  = JSON.parse(localStorage.getItem('user-data'))			
			const token = this.user.token
		}
	}

	user 
	token = 0

	baseURL = 	this.BaseAPIService.baseURL + '/users'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
	})

	private showMap = new Subject<any>();
	private location = new Subject<any>();
	private coords = new Subject<any>();

	mapToggler(value){
		this.showMap.next(value)
	}

	getMapToggler(){
		return this.showMap.asObservable();
	}

	getCoords(address){				
		const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + address
		return this.http.get(url,{headers:this.headers})
	}

	
	setCoordsofLocation(location){
		this.location.next(location)
	}

	getCoordsofLocation(){
		return this.location.asObservable();
	}

	setCoordinates(lat, lng){
		this.coords.next([lat, lng])
	}

	getCoordinates(){
		return this.coords.asObservable();
	}

}
