import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../maps/map.service'

@Component({
  selector: 'app-map-logs',
  templateUrl: './map-logs.component.html',
  styleUrls: ['./map-logs.component.scss']
})
export class MapLogsComponent implements OnInit {

  constructor(
	  private MapService : MapService
  ) { }

  ngOnInit(): void {

  }

  theme = localStorage.getItem('data-theme')
  
	log
	params

	
	agInit(params:any){
		this.log = params.value
		this.params  = params.data;console.log(params.data)
	}

	refresh(params:any):boolean{
		this.log = params.value
		this.params = params.data
		
		return true
	}

	showMap(){
		this.MapService.setCoordinates(this.params.info.lat, this.params.info.lon)
		this.MapService.mapToggler(true)
	}
	
}
