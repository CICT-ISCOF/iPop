import { TeenCentersService } from './../teen-centers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-teen-center',
  templateUrl: './add-new-teen-center.component.html',
  styleUrls: ['./add-new-teen-center.component.scss']
})
export class AddNewTeenCenterComponent implements OnInit {

	constructor(
		private TeenCentersService : TeenCentersService
	) { }

	ngOnInit(): void {
	}

	teenCenter = {
		location:'',
		tc_coordinator_count:'0',
		population:'0',
		services:'',
		municipality:'',
		district:'',
		name:''
	}

	create(){
		this.teenCenter.location = this.teenCenter.municipality
		this.TeenCentersService.addTeencenter(this.teenCenter).subscribe(data => {
			console.log(data)
		})
	}

	back(){
		this.TeenCentersService.addNewTeenCenter(false)
	}

	

}
