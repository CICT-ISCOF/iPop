import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../sign-in/sign-in.service'
import { UtilityService } from '../../utility.service'

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss']
})
export class AdministratorsComponent implements OnInit {

	constructor(
		private SignInService : SignInService,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {

	}

	isLoading = false

	data = {
		username:'jamel',
		password:'123',
		confirmPassword:'123',
		role:'Super Admin',
		fullname:'Jamel Eid Yassin',
		district:'4',
		municipality:'',
		barangay:'',	
	}

	invalidData = {
		username:false,
		password:false,
		confirmPassword:false,
		role:false,
		fullname:false,
		district:false,
		municipality:false,
		barangay:false,
	}

	
	register(){
		this.isLoading = true
		let hasError		
		for (let key in this.data) {		
			if( this.data[key] == "" || this.data[key] == null ){
				this.invalidData[key] = true
				hasError = true				
				this.UtilityService.setAlert( key + ' should not be empty', 'error')				
			}else{
				this.invalidData[key] = false
			}
		}	
		if(!hasError){			
			this.SignInService.register(this.data).subscribe(data => {	
				this.isLoading = false				
				this.UtilityService.setAlert( 'New Administrator Added', 'success')
				
			}, 
			error =>{				
				for(let message in error.error.errors){
					this.UtilityService.setAlert(error.error.errors[message],'error')
				}				
				this.isLoading = false
			})
		}
		else{
			this.isLoading = false
		}
		
	}

	

}
