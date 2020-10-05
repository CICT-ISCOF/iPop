import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from './base-api.service'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

    constructor(
      private http : HttpClient,
      private BaseAPIService : BaseAPIService
    ) { }

    user = JSON.parse(localStorage.getItem('user-data'))
    token = this.user.token

    baseURL = 	this.BaseAPIService.baseURL + '/location'
    headers = 	new HttpHeaders({
            'Accept':'application/json',
            'Authorization' : 'Bearer '+ this.token,
            'Content-Type':[]
          })	
    
	private regions = new Subject<any>();
	private provinces = new Subject<any>();
	private municipalities = new Subject<any>();
	private barangays = new Subject<any>();


    setRegions(){
		const url = this.baseURL + '/regions'
		const data = this.http.get<any>(url,{headers:this.headers})		
		this.regions.next(data)
		return data
	}

	getRegions(){
		return this.regions.asObservable();
	}

	setProvinces(region_code){
		const url = this.baseURL + '/provinces?region_code=' + region_code		
		const data =   this.http.get<any>(url,{headers:this.headers})	
		this.provinces.next(data)
		return data
	}
	
	getProvinces(){
		return this.provinces.asObservable();
	}



	// -------------------- we are here ------------------------------
	
	
	

	getMunicipalities(){		
		const url = this.baseURL + '/municipalities?province_code=0630' 
		return  this.http.get<any>(url,{headers:this.headers})		
	}
	

	getBarangays(municipality_code){
		const url = this.baseURL + '/barangays?municipality_code=' + municipality_code
		return   this.http.get<any>(url,{headers:this.headers})	
	}


} 
