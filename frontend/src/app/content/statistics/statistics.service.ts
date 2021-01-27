import { OfficialsService } from './../provincial-officials/officials.service';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

	constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService,
	
	) { }

	user =''
	token = ''

	baseURL = this.BaseAPIService.baseURL + '/statistics'
	
	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user['token']
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}

	statURL = this.BaseAPIService.baseURL + '/statistic-profiles'
	getSummaries(){
		const url  = this.BaseAPIService.baseURL + '/statistic-profiles/by-municipality'
		return this.http.get(url)
	}


	addPopulationProfileData(data){
		return this.http.post(this.statURL, data , {headers:this.getHeaders()})
	}

	filterData(filter){
		const url = this.statURL + `?municipality=${filter['municipality']}&barangay=${filter['barangay']}&year=${filter['year']}`
		return this.http.get(url)
	}

	updateData(data){
		const url = this.statURL + `/${data['id']}`
		return this.http.patch(url,data, {headers:this.getHeaders()})
	}


	general(){
		const url = this.baseURL + '/general'
		return this.http.get<any>(url)
	
	}

	population(){
		const url = this.baseURL + '/population'
		return this.http.get<any>(url)
	}

	totals(){
		const url = this.baseURL + '/totals'
		return this.http.get<any>(url)
	}

	genders(){
		const url = this.baseURL + '/genders'
		return this.http.get<any>(url)
	}

	municipality(){
		const url = this.baseURL + '/municipality'
		return this.http.get<any>(url)
	} 

	months(){
		const url = this.baseURL + '/months'
		return this.http.get<any>(url)
	}

	ageDistribution(){
		const url = this.baseURL + '/distributions'
		return this.http.get<any>(url)
	}

	getMunicipality(municipality){		
		const url = this.baseURL + '/filter?municipality=' + municipality
		return this.http.get<any>(url)
	}

}
