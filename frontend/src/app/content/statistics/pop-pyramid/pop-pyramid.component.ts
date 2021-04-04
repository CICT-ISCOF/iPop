import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'src/app/filters/filters.service';
import { Modal } from 'src/app/modal/modal.service';
import { PopulationPyramidService } from '../services/population-pyramid.service';
import { drawChart } from './../draw-chart'
import * as pyramid from './../pyramid'

@Component({
  selector: 'PopulationPyramid',
  templateUrl: './pop-pyramid.component.html',
  styleUrls: ['./pop-pyramid.component.scss']
})
export class PopPyramidComponent implements OnInit {

    constructor(
        private PopulationPyramidService: PopulationPyramidService,
        private FiltersService: FiltersService,
        private Modal: Modal

    ) {
        this.FiltersService.getYear().subscribe( value => this.year = value )
        this.FiltersService.getMunicipality().subscribe( ( value: any ) => { this.municipality = value.name } )
        this.FiltersService.getBarangay().subscribe( ( value: any ) => { this.barangay = value.name } )
        this.FiltersService.getTrigger().subscribe(() => {
            if ( this.municipality == ""  ) {
                this.getPopulationPyramid( {
                    municipality: 1,
                    barangay: 1,
                    year: this.year,
                } )
                return
            }
            this.getPopulationPyramid( {
                municipality: this.municipality,
                barangay: this.barangay,
                year: this.year,
            } )
        })
    }
     
    year: any = 0
    municipality = ""
    barangay = ""

    ngOnInit(): void {  
        this.getPopulationPyramid( {
            municipality:1,
            barangay: 1,
            year: this.year,
        } )
    }
    
    isLoading = false
    getPopulationPyramid( data: any ) {
    this.isLoading = true
       let ageDistribution:any = [
            [ 'Age', 'Female', 'Male' ],
        ]
        this.PopulationPyramidService.retrieve( data ).subscribe( ( data: any ) => {
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
            this.isLoading = false
        } )
    }
    
    AddPyramidData() {
        this.Modal.show( 'AddPyramidData', 'Add Population Pyramid Data' )
    }

}
