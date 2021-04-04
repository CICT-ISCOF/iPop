import { Component, OnInit } from '@angular/core';
import { PopulationPyramidService } from 'src/app/content/statistics/services/population-pyramid.service';
import { StatisticsService } from 'src/app/content/statistics/services/statistics.service';
import { FiltersService } from 'src/app/filters/filters.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'AddPyramidData',
  templateUrl: './pyramid-add.component.html',
  styleUrls: ['./pyramid-add.component.scss']
})
export class PyramidAddComponent implements OnInit {

    constructor (
        private PopulationPyramidService: PopulationPyramidService,
        private FiltersService: FiltersService,
        private StatisticsService: StatisticsService,

    ) {
        this.FiltersService.getYear().subscribe( value => this.year = value )
        this.FiltersService.getMunicipality().subscribe( ( value: any ) => { this.municipality = value.name } )
        this.FiltersService.getMunicipality().subscribe( ( value: any ) => { this.barangay = value.name } )
        this.FiltersService.getTrigger().subscribe( () => {
            this.ngOnInit()
        } )
        
        
        
    }
    
    year: any = 0
    municipality = "1"
    barangay = "1"
    populationPyramid = {
        data: {
            male: {},
            female: {}
        }
    }

    ngOnInit(): void {
        if ( localStorage.getItem( 'muncipality' ) == "Province" ) {
            this.PopulationPyramidService.retrieve( {
                municipality: localStorage.getItem( 'muncipality' ),
                year: localStorage.getItem( 'year' ),
            }
            ).subscribe( ( data: any ) => {
                if ( data.length != 0 ) {
                    this.populationPyramid = data[ 0 ]
                }
            } )
            return
        }        
        this.PopulationPyramidService.retrieve( {
            municipality: localStorage.getItem( 'muncipality' ),
            barangay: localStorage.getItem( 'barangay' ),
            year: localStorage.getItem( 'year' ),
        }
        ).subscribe( ( data: any ) => {
            if ( data.length != 0 ) {
                this.populationPyramid = data[ 0 ]
            }
        } )
        
    }
    
    
    
    createpopulationPyramid() {
        this.populationPyramid[ 'municipality' ] =  localStorage.getItem( 'municipality' )
        this.populationPyramid[ 'barangay' ] =localStorage.getItem('barangay')
        this.populationPyramid[ 'year' ] = localStorage.getItem('year')
        if ( this.populationPyramid[ 'year' ] == undefined ) {
            return Swal.fire( 'Provincial Data: Year only', 'Barangay Data: All Filters', 'error' )
        }
        this.PopulationPyramidService.create( this.populationPyramid ).subscribe( data => {
            this.ngOnInit()
            Swal.fire( 'Creation of Population Successful', '', 'success' )
        } )
    }

}
 