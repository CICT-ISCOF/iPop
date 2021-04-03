import { UserService } from '../../others/user.service';
import { PopulationPyramidService } from './services/population-pyramid.service';
import { Component, OnInit} from '@angular/core';
import { StatisticsService } from  './services/statistics.service'
import { FiltersService } from 'src/app/filters/filters.service';
import { Modal } from 'src/app/modal/modal.service';
import {DataService} from './services/data.service'
import { drawChart } from './draw-chart'
import * as pyramid from './pyramid'

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss','statistics.component.responsive.scss'],
})
export class StatisticsComponent implements OnInit {

	constructor(	
		private StatisticsService : StatisticsService,
		private PopulationPyramidService : PopulationPyramidService,
        private UserService: UserService,
        private Modal: Modal,
        private DataService: DataService,
        private FiltersService: FiltersService,
	) { 
        this.FiltersService.getYear().subscribe( value => this.year = value)
        this.FiltersService.getMunicipality().subscribe( (value:any) => {this.municipality = value.name} )
        this.FiltersService.getBarangay().subscribe( ( value: any ) => { this.barangay = value.name} )
	}  

    year:any = 0
    municipality = ""
    barangay = ""
	isUser =  !this.UserService.isUser()
	ngOnInit(): void {	
	}

	data:any = {}
	
    setFilter() {
        const data = {
            municipality: this.municipality,
            barangay: this.barangay,
            year: this.year,
        }
        this.getPopulationPyramid( data )
        this.getProfileData(data)
    }
    
    getProfileData(data:any) {
        this.StatisticsService.filterData( data ).subscribe( data => {
            if ( data[ 0 ] == null || undefined ) {
                this.DataService.setPopProfileData( {} )
                return
            }
            this.DataService.setPopProfileData( data[ 0 ] )
        } )
    }
    
    getPopulationPyramid( data: any ) {
       let ageDistribution:any = [
            [ 'Age', 'Female', 'Male' ],
        ]
        this.PopulationPyramidService.retrieve( data ).subscribe( (data:any) => {
            if ( data.length == 0 ) {
                ageDistribution = pyramid.data
            } else {
                for ( let key in data[ 0 ][ 'data' ][ 'female' ] ) {
                    let newText = ""
                    if ( key == 'below_1_year_old' ) {
                        newText = "Below 1 Year Old"
                    }
                    if ( key == 'eighty_and_above' ) {
                        newText = "80 and Above"
                    }
                    ageDistribution.push( [
                        key == 'below_1_year_old' || key == 'eighty_and_above' ? newText : key,
                        -Math.abs( parseInt( data[ 0 ][ 'data' ][ 'female' ][ key ] ) ),
                        parseInt( data[ 0 ][ 'data' ][ 'male' ][ key ] ),
                    ] )
                }
            }
            drawChart( 'chart', ageDistribution )
        } )
    }
    
    addPopData() {
        this.Modal.show( 'AddPopulationData', 'Add Population Profile' )
    }
    
    AddPyramidData() {
        this.Modal.show( 'AddPyramidData', 'Add Population Pyramid Data' )
    }
}
