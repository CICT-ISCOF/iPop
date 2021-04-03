import { UserService } from '../../others/user.service';
import { TopPopulatedMunicipalityService } from './services/top-populated-municipality.service';
import { PopulationPyramidService } from './services/population-pyramid.service';
import { Component, OnInit} from '@angular/core';
import { StatisticsService } from  './services/statistics.service'
import Swal from 'sweetalert2'
import { FiltersService } from 'src/app/filters/filters.service';
import { Modal } from 'src/app/modal/modal.service';
import {DataService} from './services/data.service'
import { drawChart } from './draw-chart'

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss','statistics.component.responsive.scss'],
})
export class StatisticsComponent implements OnInit {

	constructor(	
		private StatisticsService : StatisticsService,
		private PopulationPyramidService : PopulationPyramidService,
		private TopPopulatedMunicipalityService : TopPopulatedMunicipalityService,
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
	populationPyramids:any = []
    
	ngOnInit(): void {	
		this.retrievetopPopulateds()
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
        alert('ari')
        this.ageDistribution = [
            [ 'Age', 'Male', 'Female' ],
        ]
        this.PopulationPyramidService.retrieve( data ).subscribe( data => {
            this.populationPyramids = data
            for ( let key in data[ 0 ][ 'data' ][ 'female' ] ) {
                this.ageDistribution.push( [
                    key,
                    parseInt( data[ 0 ][ 'data' ][ 'male' ][ key ] ),
                    -Math.abs( parseInt( data[ 0 ][ 'data' ][ 'female' ][ key ] ) )
                ] )
            }
            drawChart( 'chart', this.ageDistribution )
        } )
    }
    
    addPopData() {
        this.Modal.show( 'AddPopulationData', 'Add Population Profile' )
    }
    
    AddPyramidData() {
        this.Modal.show( 'AddPyramidData', 'Add Population Pyramid Data' )
    }

	ageDistribution:any =  [
		['Age', 'Male', 'Female'],		
	]

	topPulated = {
		data:{}
    }
    
	topPopulateds:any = []

	createtopPopulateds(){
		this.TopPopulatedMunicipalityService.create(this.topPulated).subscribe(data => {
			this.ngOnInit()
			Swal.fire('Creation of Population Successful','','success')
		})
	}

	retrievetopPopulateds(){
		this.TopPopulatedMunicipalityService.retrieve().subscribe(data => {
			this.topPopulateds = data
		})
	}

	deletetopPopulateds(municipality){
		Swal.fire({
			title: `Are you sure you want to remove this  ${municipality['name']}?`,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				
			} 
		})
	}

	activetopPopulateds = {}
	edittopPopulateds(index){
		this.activetopPopulateds[index] == true ?  this.activetopPopulateds[index] = false : this.activetopPopulateds[index] = true	
	}

}
