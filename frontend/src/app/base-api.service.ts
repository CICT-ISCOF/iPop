import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseAPIService {

  constructor() { }

  public baseURL = 'http://172.20.10.2:8000'


}
