import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseAPIService } from '../.././base-api.service';
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

  user: any = JSON.parse(localStorage.getItem('user-data'));
  token: any = this.user.token;

  baseURL = this.BaseAPIService.baseURL + '/sbmptcs';
  headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer ' + this.token,
    'Content-Type': [],
  });

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
    return this.http.get<any>(url, { headers: this.headers });
  }

  addTeencenter(teenCenter) {
    const url = this.baseURL;
    return this.http.post<any>(url, teenCenter, { headers: this.headers });
  }

  // ---------- focal Persons ------------------

  create(focalPerson) {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons';
    return this.http.post<any>(url, focalPerson, { headers: this.headers });
  }

  retrieve() {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons';
    return this.http.get<any>(url);
  }

  update(focalPerson, id) {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons/' + id;
    return this.http.patch<any>(url, focalPerson, { headers: this.headers });
  }

  deleteFocalPerson(id) {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-focal-persons/' + id;
    return this.http.delete<any>(url, { headers: this.headers });
  }

  // ---------------- AHYD TEAM ----------------

  createTeam(ahyd) {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-teams';
    return this.http.post<any>(url, ahyd, { headers: this.headers });
  }
  retrieveTeam() {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-teams';
    return this.http.get<any>(url, { headers: this.headers });
  }
  updateTeam(ahyd) {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-teams/' + ahyd['id'];
    return this.http.patch<any>(url, ahyd, { headers: this.headers });
  }
  deleteAHYDTeam(id) {
    const url = this.BaseAPIService.baseURL + '/sbmptcs-teams/' + id;
    return this.http.delete<any>(url, { headers: this.headers });
  }


  showTeenCenter(id){
      const url = this.BaseAPIService.baseURL + '/sbmptcs/' + id;
      return this.http.get<any>(url, { headers: this.headers });
  }
}
