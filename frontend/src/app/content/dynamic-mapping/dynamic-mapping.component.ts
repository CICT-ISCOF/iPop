import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-dynamic-mapping',
  templateUrl: './dynamic-mapping.component.html',
  styleUrls: ['./dynamic-mapping.component.scss']
})
export class DynamicMappingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

	zoom: number = 15;
  
	// initial center position for the map
	lat: number = 10.7300025
	lng: number = 122.5133507
   
  
    clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index}`)
    }
    
    mapClicked($event: MouseEvent) {
		// this.markers.push({
		// 	lat: $event.coords.lat,
		// 	lng: $event.coords.lng,
		// 	draggable: true
		// });
		alert('tae')
    }
    
    markerDragEnd(m: marker, $event: MouseEvent) {
      	console.log('dragEnd', m, $event);
    }
    
	markers: marker[] = [
			// {
			// 	lat: 51.673858,
			// 	lng: 7.815982,
			// 	label: 'A',
			// 	draggable: true
			// },
			// {
			// 	lat: 51.373858,
			// 	lng: 7.215982,
			// 	label: 'B',
			// 	draggable: false
			// },
			// {
			// 	lat: 51.723858,
			// 	lng: 7.895982,
			// 	label: 'C',
			// 	draggable: true
			// }
		]
	}
  
  	// just an interface for type safety.
  	interface marker {
		lat: number;
		lng: number;
		label?: string;
		draggable: boolean
	}


