import { UserService } from '../../others/user.service';
import { PopByMunicipalityService } from './pop-by-municipality.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-population-profile-by-municipality',
  templateUrl: './population-profile-by-municipality.component.html',
  styleUrls: ['./population-profile-by-municipality.component.scss']
})
export class PopulationProfileByMunicipalityComponent implements OnInit {

    constructor(
		private PopByMunicipalityService : PopByMunicipalityService,
		private UserService : UserService
	) { }

	isUser =  !this.UserService.isUser()

    ngOnInit(): void {
		this.PopByMunicipalityService.getSummary().subscribe(data => {
			this.data = data
		})
	}
	
	data = {

	}

}
