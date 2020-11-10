import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service'
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
		private http : HttpClient,
		private BaseAPIService : BaseAPIService
	) { }

	user = JSON.parse(localStorage.getItem('user-data'))
	token = this.user.token

	baseURL = 	this.BaseAPIService.baseURL + '/users'
	headers = 	new HttpHeaders({
					'Accept':'application/json',
					'Authorization' : 'Bearer '+ this.token,
					'Content-Type':[]
				})	

	private cpdb = new Subject<any>();
	private death = new Subject<any>();
	private birth = new Subject<any>();
	private inmigration = new Subject<any>();
	private outmigration = new Subject<any>();
	private marriage = new Subject<any>();
	private keyword = new Subject<any>();

	setKeyword(keyword){
		this.keyword.next(keyword)
	}

	getKeyword(){
		return this.keyword.asObservable();
	}

	setCPDBData(data){
		this.cpdb.next(data)
	}

	getCPDBData(){
		return this.cpdb.asObservable();
	}

	setDeathData(data){
		this.death.next(data)
	}

	getDeathData(){
		return this.death.asObservable();
	}

	setBirthData(data){
		this.birth.next(data)
	}

	getBirthData(){
		return this.birth.asObservable();
	}

	setInMIgrationData(data){
		this.inmigration.next(data)
	}

	getImigrationData(){
		return this.inmigration.asObservable();
	}


	setOutMigrationData(data){
		this.outmigration.next(data)
	}

	getOutMigrationData(){
		return this.outmigration.asObservable();
	}


	setMarriageData(data){
		this.marriage.next(data)
	}

	getMarriageData(){
		return this.marriage.asObservable();
	}










}
