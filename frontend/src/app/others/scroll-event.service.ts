import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollEventService {

    constructor() { }

    private scroll  = new Subject<any>();
    
    hideHeader(boolean){
	  this.scroll.next(boolean);	
	
    }
  
    gethideHeaderValue() {			
      	return this.scroll.asObservable();
    }
}
