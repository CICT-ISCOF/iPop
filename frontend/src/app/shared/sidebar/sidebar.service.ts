import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    constructor () { }
    
    private sidebar = new Subject
    
    setSidebar( value: any ) {
        this.sidebar.next( value)
    }
    
    getSidebarActiveNav() {
        return this.sidebar.asObservable()
    }
    
}
