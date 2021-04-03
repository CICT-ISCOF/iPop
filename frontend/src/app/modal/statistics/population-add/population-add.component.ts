import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/content/statistics/services/statistics.service';
import { UtilityService } from 'src/app/others/utility.service';

@Component({
  selector: 'AddPopulationData',
  templateUrl: './population-add.component.html',
  styleUrls: ['./population-add.component.scss']
})
export class PopulationAddComponent implements OnInit {

    constructor (
        private StatisticsService: StatisticsService,
        private UtilityService: UtilityService
    ) { }
    
    data:any= {}

    ngOnInit(): void {
    }
  

    saveData() {
        this.data[ 'age_dependency_ratio' ] = '1'
        this.StatisticsService.addPopulationProfileData( this.data ).subscribe( data => {
            this.UtilityService.setAlert( 'Population Profile Added Successfully for ' + this.data.municipality, 'success' )
            this.ngOnInit()
        } )
    }

}
