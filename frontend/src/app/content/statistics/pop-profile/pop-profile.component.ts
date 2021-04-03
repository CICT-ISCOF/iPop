import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'PopProfile',
  templateUrl: './pop-profile.component.html',
  styleUrls: ['./pop-profile.component.scss']
})
export class PopProfileComponent implements OnInit {

    constructor (
        private DataService: DataService
    ) {
        this.DataService.getPopProfileData().subscribe( data => this.filteredData = data )
    }
    
    filteredData = {}

    ngOnInit(): void {
    }

}
