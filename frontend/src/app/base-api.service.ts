import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseAPIService {
  constructor() {}

  public baseURL = 'http://localhost:8001/api';
}
