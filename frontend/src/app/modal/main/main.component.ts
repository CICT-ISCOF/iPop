import { Component, OnInit } from '@angular/core';
import { Modal } from '../modal.service'

@Component({
  selector: 'Modal',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(
        private Modal : Modal
    ) { 
        this.Modal.isShowing().subscribe( value => this.isShowing = value   )
        this.Modal.getTitle().subscribe( title => this.title = title)
    }
    
    title = ""
    isShowing = false

    ngOnInit(): void {
    }

    closeModal(){
        this.Modal.close()
    }
    
}
