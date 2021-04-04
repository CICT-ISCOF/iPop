import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    constructor () { }
    
    private sidebar = new BehaviorSubject({})
    
    setSidebar( value: any ) {
        this.sidebar.next( value)
    }
    
    getSidebarActiveNav() {
        return this.sidebar.asObservable()
    }
    
}
