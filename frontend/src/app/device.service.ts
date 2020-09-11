import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {

	constructor() { }
	
	private sidebar  = new Subject<any>();
	private dropdown  = new Subject<any>();

	showSidebar(boolean){
		this.sidebar.next(boolean);	
	}

	sidebarState() {			
		return this.sidebar.asObservable();
	}

	showDropdown(boolean){
		this.dropdown.next(boolean);	
	}

	dropdownState() {			
		return this.dropdown.asObservable();
	}
}
