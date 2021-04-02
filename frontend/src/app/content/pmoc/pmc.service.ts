import { BaseAPIService } from '../../base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PmcService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) {
		
	}

	user:any = ''
	token:any = ''

	baseURL = 	this.BaseAPIService.baseURL + '/pmoccs'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private page = new Subject<any>();

	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user.token	
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}

	create (data){
		const url = this.baseURL
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieve (municipality, barangay){
		const url = this.baseURL + '?municipality=' + municipality + '&barangay=' + barangay
		return this.http.get<any>(url )
	}

	update(data, id){
		const url = this.baseURL + '/' +  id
		return this.http.patch<any>(url,data ,{headers:this.getHeaders()})
	}
	
	deletePMC(id){
		const url = this.baseURL + '/' +  id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}

	show(data){
		const url =  this.baseURL + '/' + data
		return this.http.get<any>(url )
	}


	// ------------PMOC TEAMS -------------

	createTeams (data){
		const url = this.BaseAPIService.baseURL + '/pmocc-teams'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieveTeams (){
		const url = this.BaseAPIService.baseURL + '/pmocc-teams'
		return this.http.get<any>(url )
	}

	updateTeams(data, id){
		const url = this.BaseAPIService.baseURL + '/pmocc-teams/' + id
		return this.http.patch<any>(url,data ,{headers:this.getHeaders()})
	}
	
	deletePMCTeams(id){
		const url = this.BaseAPIService.baseURL + '/pmocc-teams/' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}

	showTeams(data){
		const url =  this.BaseAPIService.baseURL + '/pmocc-teams'
		return this.http.get<any>(url )
	}
 
	showPMC(municipality, year){
		const url =  this.baseURL + `?municipality=${municipality}&year=${year}`
		return this.http.get<any>(url)
	}


	postToMOnthController(data){
		const url = this.BaseAPIService.baseURL + '/month-charts'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	postToinsidence(data){		
		const url = this.BaseAPIService.baseURL + '/incidences'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}


	// -----------charts ----------

	storeCoupleByAgeGroup(data){
		const url = this.BaseAPIService.baseURL + '/pmc-age-group'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieveCoupleByAgeGroup(municipality,year){
		const url = this.BaseAPIService.baseURL + `/pmc-age-group?municipality=${municipality}&year=${year}`
		return this.http.get<any>(url)
	}


	storeApplicantsByEmploymentStatus(data){
		const url = this.BaseAPIService.baseURL + '/pmc-ess'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieveApplicantsByEmploymentStatus(municipality,year){
		const url = this.BaseAPIService.baseURL + `/pmc-ess?municipality=${municipality}&year=${year}`
		return this.http.get<any>(url)
	}

	storeAverageMonthlyIncome(data){
		const url = this.BaseAPIService.baseURL + '/pmc-amis'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}


	retrieveAverageMonthlyIncome(municipality,year){
		const url = this.BaseAPIService.baseURL + `/pmc-amis?municipality=${municipality}&year=${year}`
		return this.http.get<any>(url)
	}

	storeknowLedgeOnFP(data){
		const url = this.BaseAPIService.baseURL + '/pmc-kfp'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrieveknowLedgeOnFP(municipality,year){
		const url = this.BaseAPIService.baseURL + `/pmc-kfp?municipality=${municipality}&year=${year}`
		return this.http.get<any>(url)
	}

	storebyCivilStatus(data){
		const url = this.BaseAPIService.baseURL + '/pmc-ccs'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	}

	retrievebyCivilStatus(municipality,year){
		const url = this.BaseAPIService.baseURL + `/pmc-ccs?municipality=${municipality}&year=${year}`
		return this.http.get<any>(url)
	}


}
