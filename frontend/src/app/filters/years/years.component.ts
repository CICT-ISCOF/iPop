import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'Years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss']
})
export class YearsComponent implements OnInit {

    constructor (
        private FiltersService: FiltersService
    ) { }
    

    years = []
    selectedYear = ""
    
    ngOnInit(): void {
        for ( let year = 2015; year < 2100; year++ ) {
            this.years.push( year )
        }
    }
    
    setYear(year:any) {
        this.selectedYear = year
        this.FiltersService.setYear( year )
        localStorage.setItem( 'year', year)
    }

}
