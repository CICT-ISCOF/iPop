import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor () { }
    
    private popProfileData = new Subject()
    
    setPopProfileData(data:any) {
        this.popProfileData.next( data)
    }
    
    getPopProfileData(){
        return this.popProfileData.asObservable()
    }
    
}
