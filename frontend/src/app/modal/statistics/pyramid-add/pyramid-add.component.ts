import { Component, OnInit } from '@angular/core';
import { PopulationPyramidService } from 'src/app/content/statistics/services/population-pyramid.service';
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
    ) {
        this.FiltersService.getYear().subscribe( value => this.year = value )
        this.FiltersService.getMunicipality().subscribe( ( value: any ) => { this.municipality = value.name } )
        this.FiltersService.getMunicipality().subscribe( ( value: any ) => { this.barangay = value.name } )
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
      
    }
    createpopulationPyramid() {
        this.populationPyramid[ 'municipality' ] = this.municipality
        this.populationPyramid[ 'barangay' ] = this.barangay
        this.populationPyramid[ 'year' ] = localStorage.getItem('year')
        if ( this.populationPyramid[ 'year' ] == undefined ) {
            return Swal.fire( 'Please set Filters to add municipality', '', 'error' )
        }
        this.PopulationPyramidService.create( this.populationPyramid ).subscribe( data => {
            this.ngOnInit()
            Swal.fire( 'Creation of Population Successful', '', 'success' )
        } )
    }

}
 