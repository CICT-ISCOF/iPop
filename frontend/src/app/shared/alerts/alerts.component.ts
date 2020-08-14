import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService
	) {
		this.message = this.UtilityService.getAlert().subscribe(message => {

			console.log(message)

			this.alerts.push(message)		
		})
	 }

	ngOnInit(): void {

	}

	message

	alerts = []

	
}
