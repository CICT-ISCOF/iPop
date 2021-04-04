import { Component, OnInit } from '@angular/core';
import { TopPopulatedMunicipalityService } from '../services/top-populated-municipality.service';
import Swal from 'sweetalert2'
import { LocationService } from 'src/app/others/location.service';

@Component({
  selector: 'TopPopulated',
  templateUrl: './top-populated.component.html',
  styleUrls: ['./top-populated.component.scss']
})
export class TopPopulatedComponent implements OnInit {

    constructor (
        private TopPopulatedMunicipalityService: TopPopulatedMunicipalityService,
        private LocationService: LocationService
  ) { }

    ngOnInit(): void {
        this.retrievetopPopulateds()
        this.getMuncipalities()
    }
    
    municipalities: any = []

    getMuncipalities() {
        this.LocationService.getMunicipalities().subscribe( data => {
            this.municipalities = data
        } )
    }
    
    topPulated = {
        data: {}
    }
    topPopulateds: any = []

    createtopPopulateds() {
        this.TopPopulatedMunicipalityService.create( this.topPulated ).subscribe( data => {
            this.ngOnInit()
            Swal.fire( 'Creation of Population Successful', '', 'success' )
        } )
    }
    retrievetopPopulateds() {
        this.TopPopulatedMunicipalityService.retrieve().subscribe( data => {
            this.topPopulateds = data
        } )
    }
    deletetopPopulateds( municipality ) {
        Swal.fire( {
            title: `Are you sure you want to remove this  ${ municipality.data[ 'name' ] }?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Remove',
            cancelButtonText: 'Nope'
        } ).then( ( result ) => {
            if ( result.value ) {
                this.TopPopulatedMunicipalityService.deleteData( municipality[ 'id' ] ).subscribe( () => {
                    Swal.fire( ` ${ municipality.data[ 'name' ] } has been deleted from list`, '', 'success' )
                    this.ngOnInit()
                })
            }
        } )
    }
    activetopPopulateds = {}
    edittopPopulateds( index ) {
        this.activetopPopulateds[ index ] == true ? this.activetopPopulateds[ index ] = false : this.activetopPopulateds[ index ] = true
    }

}
