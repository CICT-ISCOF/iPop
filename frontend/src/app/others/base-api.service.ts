import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
	providedIn: 'root',
})
export class BaseAPIService {
	constructor() {}

	public baseURL = 'http://127.0.0.1:8000/api'

	user = ''
	token = ''

	getHeaders() {
		this.user = JSON.parse(localStorage.getItem('user-data'))
		this.token = this.user['token']
		return new HttpHeaders({
			Accept: 'application/json',
			Authorization: 'Bearer ' + this.token,
			'Content-Type': [],
		})
	}
}
