import { Component, OnInit } from '@angular/core';
import { PopulationPyramidService } from 'src/app/content/statistics/services/population-pyramid.service';
import { UtilityService } from 'src/app/others/utility.service';

@Component({
  selector: 'app-pyramid-edit',
  templateUrl: './pyramid-edit.component.html',
  styleUrls: ['./pyramid-edit.component.scss']
})
export class PyramidEditComponent implements OnInit {

    constructor (
        private PopulationPyramidService: PopulationPyramidService,
        private UtilityService: UtilityService

  ) { }

  ngOnInit(): void {
  }
    updatepopulationPyramid( pyramidData ) {
        this.PopulationPyramidService.update( pyramidData ).subscribe( data => {
            this.ngOnInit()
            this.UtilityService.setAlert( 'Population data updated succcesffully', 'success' )
        } )
    }

}
