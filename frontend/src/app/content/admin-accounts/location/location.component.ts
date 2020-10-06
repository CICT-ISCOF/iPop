import { Component, OnInit } from '@angular/core';
import { MapService } from '../../maps/map.service'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(
    private MapService : MapService
  ) { }

  ngOnInit(): void {
  }

  params

	agInit(params:any){
    this.params = params.data
  }

  showMap(){    
    this.MapService.setCoordsofLocation(this.params.barangay + ', ' + this.params.munipali + ', Iloilo')
    this.MapService.mapToggler(true)
  }

}
