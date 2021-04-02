import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../others/base-api.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeenCentersService {
	constructor(
		private http: HttpClient,
		private BaseAPIService: BaseAPIService
	) {
		if (
		localStorage.getItem('user-data') &&
		localStorage.getItem('user-data') != undefined
		) {
		this.user = JSON.parse(localStorage.getItem('user-data'));
		this.token = this.user.token;
		}
	}

	user: any = {}
	token: any =''

	baseURL = this.BaseAPIService.baseURL + '/sbmptcs';
	headers = new HttpHeaders({
		Accept: 'application/json',
		Authorization: 'Bearer ' + this.token,
		'Content-Type': [],
	});
	
	getHeaders(){
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user['token']
		return new HttpHeaders({
			'Accept':'application/json',
			'Authorization' : 'Bearer '+ this.token,
			'Content-Type':[]
		})	
	}
	
	private show = new Subject<any>();
	private add = new Subject<any>();

	setToHidden() {
		this.show.next(false);
	}

	triggerListener() {
		return this.show.asObservable();
	}

	addNewTeenCenter(value) {
		this.add.next(value);
	}
	
	backListener() {
		return this.add.asObservable();
	}

	getTeenCenters() {
		const url = this.baseURL;
		return this.http.get<any>(url);
	}

	addTeencenter(teenCenter) {
		const url = this.baseURL;
		return this.http.post<any>(url, teenCenter, { headers: this.getHeaders() });
	}

	updateTeenCenter(data){
		const url = this.baseURL + `/${data['id']}`
		return this.http.patch<any>(url, data, { headers: this.getHeaders() });
	}

	deleteTeenCenter(id){
		const url = this.baseURL + `/${id}`
		return this.http.delete<any>(url, { headers: this.getHeaders() });
	}

	// ---------- focal Persons ------------------

	create(focalPerson) {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons';
		return this.http.post<any>(url, focalPerson, { headers: this.getHeaders() });
	}

	retrieve() {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons';
		return this.http.get<any>(url);
	}

	update(focalPerson, id) {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons/' + id;
		return this.http.patch<any>(url, focalPerson, { headers: this.getHeaders() });
	}

	deleteFocalPerson(id) {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons/' + id;
		return this.http.delete<any>(url, { headers: this.getHeaders() });
	}

	// ---------------- AHYD TEAM ----------------

	createTeam(ahyd) {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-teams';
		return this.http.post<any>(url, ahyd, { headers: this.getHeaders() });
	}
	retrieveTeam() {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-teams';
		return this.http.get<any>(url);
	}
	updateTeam(ahyd) {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-teams/' + ahyd['id'];
		return this.http.patch<any>(url, ahyd, { headers: this.getHeaders() });
	}
	deleteAHYDTeam(id) {
		const url = this.BaseAPIService.baseURL + '/sbmptcs-teams/' + id;
		return this.http.delete<any>(url, { headers: this.getHeaders() });
	}

	showTeenCenter(id){
		const url = this.BaseAPIService.baseURL + '/sbmptcs/' + id;
		return this.http.get<any>(url);
	}
	

	// ---------personnel incharhe ----------

	createPersonnel(data){
		const url = this.BaseAPIService.baseURL + '/sbmptc-personnel'
		return this.http.post<any>(url,data ,{headers:this.getHeaders()})
	} 

	retrivePersonnel(id){
		const url = this.BaseAPIService.baseURL + `/sbmptc-personnel?sbmptc_id=${id}`
		return this.http.get<any>(url )
	} 

	updatePersonnel(data){
		const url = this.BaseAPIService.baseURL + '/sbmptc-personnel/' + data['id']
		return this.http.patch<any>(url ,data,{headers:this.getHeaders()})
	} 


	deletePersonnel(id){
		const url = this.BaseAPIService.baseURL + '/sbmptc-personnel' + id
		return this.http.delete<any>(url ,{headers:this.getHeaders()})
	}



  
}
