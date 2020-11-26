import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../../base-api.service';

@Injectable({
    providedIn: 'root',
})
export class StatisticsService {
    constructor(
        private http: HttpClient,
        private BaseAPIService: BaseAPIService
    ) {}

    user = JSON.parse(localStorage.getItem('user-data'));
    token = this.user.token;

    baseURL = this.BaseAPIService.baseURL + '/statistics';
    headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
        'Content-Type': [],
    });

    profile({ municipality, barangay, year }) {
        let url = `${this.BaseAPIService.baseURL}/statistic-profiles`;
        if (municipality.length > 0) {
            url += `?municipality=${municipality}`;
            if (barangay.length > 0) {
                url += `&barangay=${barangay}`;
                if (year.length > 0) {
                    url += `&year=${year}`;
                }
            }
        }
        return this.http.get<any>(url, { headers: this.headers });
    }

    general() {
        const url = this.baseURL + '/general';
        return this.http.get<any>(url, { headers: this.headers });
    }

    population() {
        const url = this.baseURL + '/population';
        return this.http.get<any>(url, { headers: this.headers });
    }

    totals() {
        const url = this.baseURL + '/totals';
        return this.http.get<any>(url, { headers: this.headers });
    }

    genders() {
        const url = this.baseURL + '/genders';
        return this.http.get<any>(url, { headers: this.headers });
    }

    municipality() {
        const url = this.baseURL + '/municipality';
        return this.http.get<any>(url, { headers: this.headers });
    }

    months() {
        const url = this.baseURL + '/months';
        return this.http.get<any>(url, { headers: this.headers });
    }

    ageDistribution() {
        const url = this.baseURL + '/distributions';
        return this.http.get<any>(url, { headers: this.headers });
    }

    getMunicipality(municipality) {
        const url = this.baseURL + '/filter?municipality=' + municipality;
        return this.http.get<any>(url, { headers: this.headers });
    }
}
