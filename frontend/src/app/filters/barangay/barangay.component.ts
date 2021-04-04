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
        })
    }

    barangays = []
    municipality:any = {}
    selectedBarangayName = ""
    
    
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
