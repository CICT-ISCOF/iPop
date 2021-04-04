import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/others/location.service';
import { FiltersService } from '../filters.service'


@Component({
  selector: 'Municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss']
})
export class MunicipalityComponent implements OnInit {

    constructor (
        private LocationService: LocationService,
        private FiltersService: FiltersService
    ) { }

    municipalities = []
    selectedMunicipalityName = ""
    
    ngOnInit(): void {
        this.getMuncipalities()
    }
    
    getMuncipalities() {
        this.LocationService.getMunicipalities().subscribe( data => {
            this.municipalities = data
        } )
    }
    
    selectedMunicipality( muncipality: any ) {
        this.selectedMunicipalityName = muncipality.name
        this.FiltersService.setMunicipality( muncipality )
        localStorage.setItem( 'muncipality', muncipality.name )

    }
}
