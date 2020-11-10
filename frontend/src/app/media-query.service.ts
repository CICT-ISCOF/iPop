import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService {

	constructor() { }

	private size  = new Subject<any>();


	setSize(mediaWidth){
		this.size.next(mediaWidth);	
	}

	getSize() {			
		return this.size.asObservable();
	}
}
