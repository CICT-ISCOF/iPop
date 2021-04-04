import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/content/statistics/services/statistics.service';
import { LocationService } from 'src/app/others/location.service';
import { UtilityService } from 'src/app/others/utility.service';

@Component({
  selector: 'AddPopulationData',
  templateUrl: './population-add.component.html',
  styleUrls: ['./population-add.component.scss']
})
export class PopulationAddComponent implements OnInit {

    constructor (
        private StatisticsService: StatisticsService,
        private UtilityService: UtilityService,
        private LocationService: LocationService
        
    ) { }
    
    data:any= {}

    ngOnInit(): void {
        for (let i = 2015; i <= 2050; i++) {
			this.years.push(i);
		}
        this.getMuncipalities()
    }
    
    municipalities = []
    barangays = []
    
    getMuncipalities() {
        this.LocationService.getMunicipalities().subscribe( data => {
            this.municipalities = data
        } )
    }

    barangayIsLoading = false
    getBarangays( event ) {
        this.data.municipality = event.target.options[ event.target.options.selectedIndex ].text;
        this.LocationService.getBarangays( event.target.value ).subscribe( data => {
            this.barangays = data
        } )
    }
    
    years = []
    
    tab ={
        provincial:true,
        barangay:false
    }
    
    makeActive( tab:any ) {
        this.tab = {
            provincial: false,
            barangay: false
        }
        this.tab[ tab] = true
    }

    saveData() {
        this.data[ 'age_dependency_ratio' ] = '1'
        this.StatisticsService.addPopulationProfileData( this.data ).subscribe( data => {
            this.UtilityService.setAlert( 'Population Profile Added Successfully for ' + this.data.municipality, 'success' )
            this.ngOnInit()
        } )
    }
    
    

}
