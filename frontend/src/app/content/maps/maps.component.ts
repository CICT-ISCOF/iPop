import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MapService} from '../maps/map.service'



import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

	constructor(
		private  MapService : MapService
	) { 
		
		this.MapService.getMapToggler().subscribe(value => {
			if(value == true){
				document.getElementById('modalActivate').click()
			}
		})
		this.MapService.getCoordsofLocation().subscribe(location => {
			this.showMap(location)
		})

		this.MapService.getCoordinates().subscribe(data => {
			this.data = data
			this.map = new Map({
				target: 'mapContainer',
				layers: [
				new TileLayer({
					source: new OSM()
				})
				],
				view: new View({
				center: olProj.fromLonLat([parseInt(data[1]) , parseInt(data[0])]),
				zoom: 9
				})
			})		
		})
	}

	map
	subscription : Subscription
	ngOnInit(): void {
		
	}

	data:any = []	
	showMap(location){
		this.data = []
			this.MapService.getCoords(location).subscribe(data => {		
			this.data = data
			if(this.data.length != 0){
				this.map = new Map({
					target: 'mapContainer',
					layers: [
					new TileLayer({
						source: new OSM()
					})
					],
					view: new View({
					center: olProj.fromLonLat([parseInt(data[0].lon) , parseInt(data[0].lat)]),
					zoom: 9
					})
				})						
			}						
		})
	}

}
