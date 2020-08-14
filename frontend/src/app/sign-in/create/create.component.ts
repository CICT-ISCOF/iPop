import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService
	) { }
	
	isValid = true

	account ={
		pin:'',
		securityQuestion:''
	}

	tries = 5

    ngOnInit(): void {

	}
	
	pinHandler(){
		this.isValid = true
		if(this.account.pin.length > 5) {
			this.isValid = false
			this.account.pin = ''
			this.tries -= 1			
		}	
	}

	closeModal(){
		this.UtilityService.setLoginWithPin(false)
	}

}
