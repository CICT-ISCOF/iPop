import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/others/location.service';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'Barangay',
  templateUrl: './barangay.component.html',
  styleUrls: ['./barangay.component.scss']
})
export class BarangayComponent implements OnInit {

    constructor(
        private FiltersService: FiltersService,
        private LocationService: LocationService
    ) {
        this.FiltersService.getMunicipality().subscribe( data => {
            this.municipality = data
            this.getBarangays()
        } )
        
        setInterval( () => {
            if ( localStorage.getItem( 'muncipality' ) == "Province" ) {
                this.show = false
            } else {
                this.show = true
            }
        },100)
    }

    barangays = []
    municipality:any = {}
    selectedBarangayName = ""
    show = true
    
    ngOnInit(): void {
        this.getBarangays()
    }
    
    getBarangays(  ) {
        if ( this.municipality.code != undefined ) {
            this.LocationService.getBarangays( this.municipality.code ).subscribe( data => this.barangays = data )
        }
        
    }
    
    setBarangay(barangay) {
        this.selectedBarangayName = barangay.name
        this.FiltersService.setBarangay( barangay )
        localStorage.setItem( 'barangay', barangay.name )
    }

}
