import { Component, OnInit } from '@angular/core';
import { PopulationPyramidService } from 'src/app/content/statistics/services/population-pyramid.service';
import { StatisticsService } from 'src/app/content/statistics/services/statistics.service';
import { LocationService } from 'src/app/others/location.service';
import { UtilityService } from 'src/app/others/utility.service';
import Swal from 'sweetalert2';
import * as pyramid from './pyramid'

@Component({
  selector: 'AddPopulationData',
  templateUrl: './population-add.component.html',
  styleUrls: ['./population-add.component.scss']
})
export class PopulationAddComponent implements OnInit {

    constructor (
        private StatisticsService: StatisticsService,
        private UtilityService: UtilityService,
        private LocationService: LocationService,
        private PopulationPyramidService: PopulationPyramidService
    ) { }
    

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
    
    setBarangay( $event ) {
        
    }
    
    data = {
        municipality: '',
        barangay: '',
        year:0
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
        if ( this.tab.provincial == true ) {
            this.data.municipality = "Province"
            this.data.barangay = '1'
            this.StatisticsService.addPopulationProfileData( this.data ).subscribe( data => {
                this.UtilityService.setAlert( 'Population Profile Added Successfully for ' + this.data.municipality, 'success' )
                this.ngOnInit()
                this.addPyramid( data )
            } )
            return
        }
        this.StatisticsService.addPopulationProfileData( this.data ).subscribe( data => {
            this.UtilityService.setAlert( 'Population Profile Added Successfully for ' + this.data.municipality, 'success' )
            this.ngOnInit()
            this.addPyramid( data )
        } )
    }
    
    addPyramid( data: any ) {
        let populationPyramid: any = {}
        populationPyramid[ 'data' ] = pyramid.data
        populationPyramid[ 'municipality' ] = data.municipality
        populationPyramid[ 'barangay' ] = data.barangay
        populationPyramid[ 'year' ] = data.year
        this.PopulationPyramidService.create( populationPyramid ).subscribe( data => {
            this.ngOnInit()
            Swal.fire( 'Population Pyramid Successfully Created', '', 'success' )
        } )
    }
    
    

}
