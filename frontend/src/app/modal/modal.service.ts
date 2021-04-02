import { Injectable } from '@angular/core';
import {Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class Modal {

    constructor() { }
    
    private modal = new Subject<any>()
    private showModal = new Subject<any>()
    private title = new Subject<any>()
    
    show(modal:String,title:String){
        this.showModal.next(true)
        this.modal.next( modal )
        this.title.next( title )
    }
    
    close(){
        this.showModal.next(false)
    }
    
    isShowing(){
        return this.showModal.asObservable()
    }
    
    getTitle() {
        return this.title.asObservable()
    }
    
    renderModal(){
        return this.modal.asObservable()
    }
    
    
}
