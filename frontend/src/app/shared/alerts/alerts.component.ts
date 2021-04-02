import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service'

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
			this.alerts.push(message)		
		})
	 }

	ngOnInit(): void {
		this.fadeOut()
	}

	message

	alerts = []

	fadeOut(){
		setInterval(()=>{
			if(this.alerts.length !== 0){
				this.alerts.pop()
			}
		},4500)
	}

	
}
