import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import * as structure from './pop-profile'

@Component({
  selector: 'PopProfile',
  templateUrl: './pop-profile.component.html',
  styleUrls: ['./pop-profile.component.scss']
})
export class PopProfileComponent implements OnInit {

    constructor (
        private DataService: DataService
    ) {
        this.DataService.getPopProfileData().subscribe( data => {
            this.filteredData = data
        } )
        
        structure.getData().then( response => {
         setTimeout(() => {
             this.data = response.data
             this.name = response.name
         }, 500);
        } )
        
    }
    
    filteredData = {}
    
    data:any = []
    name:any = []
    

    ngOnInit(): void {
        
    }

}
