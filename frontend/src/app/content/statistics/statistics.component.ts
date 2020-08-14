import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path'


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

	constructor(	
	) { }

	ngOnInit(): void {
		localStorage.setItem('location','Province of Iloilo')	
		localStorage.setItem('coordinates',JSON.stringify([10.7202, 122.5621]))	
		localStorage.setItem('mapOptions','12')	
		this.renderMap()
	}
	
	map:any;

	coordinates:any = JSON.parse(localStorage.getItem('coordinates'))

	mapOptions = {	
		zoom:parseInt(localStorage.getItem('mapOptions'))
	}

	barangayCoordiantes:any = [10.8776,122.7083]


	renderMap(){
		this.map = L.map('map').setView(this.coordinates, this.mapOptions.zoom);
		L.tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{ 
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			})
		.addTo(this.map);	

		let DefaultIcon = L.icon({
			iconUrl: '../../../assets/marker-icon.png',
			shadowUrl: ''
		});		

		var circle = {
			color:'#1CB7EB',
			fillCOlor:'#f03',
			radius:8928
		}
		
		// L.circle(this.coordinates,circle).addTo(this.map);	


		L.Marker.prototype.options.icon = DefaultIcon;
		L.marker(this.coordinates).bindPopup(localStorage.getItem('location')).addTo(this.map);	
	}

	location = localStorage.getItem('location')

	changeMunicipality(e){
		localStorage.setItem('coordinates',JSON.stringify([10.9216, 122.7407]))	
		localStorage.setItem('location',e.target.value)	
		localStorage.setItem('mapOptions','12')	

		location.reload()
	}
	changeMap(e){
		localStorage.setItem('coordinates',JSON.stringify(this.barangayCoordiantes))
		localStorage.setItem('mapOptions','14')
		localStorage.setItem('location',e.target.value)	
		location.reload()
		
	}
	

	data = [
		['State', 'Value'],
		[10.8776,122.7083, 1],
		
	]
	  
	opts = {
		// region: 'PH',
		// displayMode: 'regions',
		// resolution: 'provinces',
	};


	charts = {
		geo:[
			['Country', 'Popularity'],
			['Germany', 200],
			['United States', 300],
			['Brazil', 400],
			['Canada', 500],
			['France', 600],
			['RU', 700]
		],
		ageGroup: [
			['0-14', 100],
			['15-64', 200],
			['Over 65', 100],
		],
		sexData:[
			['Male',100],
			['Female', 200]
		],
		ageDistribution: [
			['Below 1 year old',54],
			['01-04',23],
			['05-09',45],
			['10-14',34],
			['15-19',54],
			['20-24',34],
			['25-29',56],
			['30-34',64],
			['35-39',43],
			['40-44',76],
			['45-49',34],
			['50-54',34],
			['55-59',56],
			['60-64',43],
			['65-69',31],
			['70-74',15],
			['75-79',61],
			['80 and above',45],
		],
		deaths:[
			['January',54],
			['Feburary',254],
			['March',54],
			['April',454],
			['May',554],
			['June',654],
			['July',454],
			['August',354],
			['September',454],
			['October',254],
			['November',554],
			['December',154],
		]
	}
	
	chartOptions = {
		colors: ['#199CF8', '#7C78F6', '#5D59E9', '#0E0CAF', 'blue','#5B92DE','#9A58F3'],
		is3D: false,		
	}

	deathOptions = {
		colors: ['orange', '#F84242'],
		is3D: true,		
	}
	birthOptions = {
		colors: ['#00C34F', '#F84242'],
		is3D: true,		
	}

	outMigrantsOptions = {
		colors: ['gray', 'gray'],
		is3D: true,		
	}

	marriedOptions = {
		colors:['F30091'],
		is3D: true,		
	}
	


	

}
