import { UserService } from '../../others/user.service';
import { PopulationPyramidService } from './services/population-pyramid.service';
import { Component, OnInit} from '@angular/core';
import { StatisticsService } from  './services/statistics.service'
import { FiltersService } from 'src/app/filters/filters.service';
import { Modal } from 'src/app/modal/modal.service';
import {DataService} from './services/data.service'


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
        this.FiltersService.getBarangay().subscribe( ( value: any ) => { this.barangay = value.name } )
        this.PopulationPyramidService.getTrigger().subscribe( () => this.setFilter())
	}  

    year: any = new Date().getFullYear();
    municipality = "Province"
    barangay = "1"
	isUser =  !this.UserService.isUser()
	ngOnInit(): void {	
        this.setFilter()
	}

	data:any = {}
	
    setFilter() {
        let data = {
            municipality: this.municipality,
            barangay: this.barangay,
            year: this.year,
        }
        data.municipality = "Province"
        if ( localStorage.getItem( 'muncipality' ) != undefined) {
            data.municipality = localStorage.getItem( 'muncipality' )
        }
        this.getProfileData( data )
        this.FiltersService.setTrigger(data)
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
    
    addPopData() {
        this.Modal.show( 'AddPopulationData', 'Add Population Profile' )
    }
    
   
}
