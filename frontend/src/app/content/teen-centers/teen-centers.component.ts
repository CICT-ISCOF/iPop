import { TeenCentersService } from './teen-centers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teen-centers',
  templateUrl: './teen-centers.component.html',
  styleUrls: ['./teen-centers.component.scss']
})
export class TeenCentersComponent implements OnInit {

	constructor(
		private TeenCentersService : TeenCentersService
	) { 
		this.listener = this.TeenCentersService.triggerListener().subscribe(value => {
			this.show = value
		})
	}

	listener

	ngOnInit(): void {

	}
	
	show = false

	showMPC(){
		this.show = true
	}

}
