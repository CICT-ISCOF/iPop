import { UserService } from '../../others/user.service';
import { TopPopulatedMunicipalityService } from './services/top-populated-municipality.service';
import { PopulationPyramidService } from './services/population-pyramid.service';
import { OfficialsService } from './../provincial-officials/officials.service';
import { UtilityService } from '../../others/utility.service';
import { Component, OnInit} from '@angular/core';
import { StatisticsService } from  './services/statistics.service'
import Swal from 'sweetalert2'
import { OfficialsService1 } from '../officials-of/officials.service';
import { FiltersService } from 'src/app/filters/filters.service';
import * as chart from './chartOption'
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
        private FiltersService: FiltersService,
		private UtilityService : UtilityService,
		private OfficialsService : OfficialsService,
		private OfficialsService1 : OfficialsService1,
		private PopulationPyramidService : PopulationPyramidService,
		private TopPopulatedMunicipalityService : TopPopulatedMunicipalityService,
        private UserService: UserService,
        private Modal: Modal,
        private DataService : DataService
	) { 
		// this.OfficialsService1.listen().subscribe(()=>this.CheckBarangaysAndMunicipalities() )
        
        this.FiltersService.getYear().subscribe( value => this.year = value)
        this.FiltersService.getMunicipality().subscribe( (value:any) => {this.municipality = value.name} )
        this.FiltersService.getBarangay().subscribe( (value:any) => this.barangay = value.name )

	}  

    year:any = 0
    municipality = ""
    barangay = ""
    googleChartOptions = chart.options
	isUser =  !this.UserService.isUser()

	ngOnInit(): void {	
		this.retrievetopPopulateds()
		localStorage.removeItem('municipality-ref') 
		localStorage.removeItem('barangay-ref') 
	}

	data:any = {}
	
    setFilter() {
        const data = {
            municipality: this.municipality,
            barangay: this.barangay,
            year: this.year,
        }
        if ( this.filterIsValidated() ) {
            this.StatisticsService.filterData( data ).subscribe( data  => {
                    if ( data[ 0 ] == null || undefined ) {
                        this.DataService.setPopProfileData( {})
                        return
                }
                this.DataService.setPopProfileData( data[ 0 ] )
                }
            )
        }
    }
    
    saveData() {
        this.data[ 'age_dependency_ratio' ] = '1'
        this.StatisticsService.addPopulationProfileData( this.data ).subscribe( data  => {
            this.UtilityService.setAlert( 'Population Profile Added Successfully for ' + this.data.municipality, 'success' )
            this.ngOnInit()
        })
    }

    addPopData() {
        this.Modal.show( 'AddPopulationData', 'Add Population Profile' )
    }
    
    

    
    filterIsValidated() {
        if ( this.municipality == "") {
            return false
        }
        if ( this.barangay == "" ) {
            return false
        }
        if ( this.year == 0 ) {
            return false
        }
        return true
    }
    

	isEmpty(JSONObject) {
		for(var prop in JSONObject) {
			if(JSONObject.hasOwnProperty(prop))
				return false;
		}
		return true;
	}


	populationPyramid = {
		data:{
			male:{},
			female:{}
		}
	}
	populationPyramids:any = []

	createpopulationPyramid(){
		// this.populationPyramid['municipality'] = this.filter.municipality
		// this.populationPyramid['barangay'] = this.filter.barangay
		// this.populationPyramid['year'] = this.filter.year
		if(this.populationPyramid['year'] == '' ){
			return Swal.fire('Please set Filters to add municipality','','error')
		}
		this.PopulationPyramidService.create(this.populationPyramid).subscribe(data => {
			this.ngOnInit()
			Swal.fire('Creation of Population Successful','','success')
		})
	}

	retrievepopulationPyramid(filters){
		this.ageDistribution = [
			['Age', 'Male', 'Female'],		
		]
		this.PopulationPyramidService.retrieve(filters).subscribe(data => {
			this.populationPyramids = data
			for(let key in data[0]['data']['female']){
				this.ageDistribution.push([
					key,
					parseInt(data[0]['data']['male'][key]),
					-Math.abs(parseInt(data[0]['data']['female'][key]))
				])
			}
			this.drawChart('male-and-female',this.ageDistribution)
		})
	}

	ageDistribution:any =  [
		['Age', 'Male', 'Female'],		
	]

	drawChart(chartId,chartData){
		let style = this.googleChartOptions.pyramidChartOptions
		const chart = () => {
			var data = google.visualization.arrayToDataTable(chartData)
			var chart = new google.visualization.BarChart(document.getElementById(chartId))			
			var formatter = new google.visualization.NumberFormat({
				pattern: ';'
			})
			formatter.format(data, 2)
			chart.draw(data, style )
		}
		google.load("visualization", "1", {packages:["corechart"]})
		google.setOnLoadCallback(chart)
		
	}

	updatepopulationPyramid(pyramidData){
		this.PopulationPyramidService.update(pyramidData).subscribe(data => {
			this.ngOnInit()
			this.UtilityService.setAlert('Population data updated succcesffully','success')
		})
	}

	activepopulationPyramids = {}
	editpopulationPyramids(index){
		this.activepopulationPyramids[index] == true ?  this.activepopulationPyramids[index] = false : this.activepopulationPyramids[index] = true	
	}


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
			console.log('top populated ', data)
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
