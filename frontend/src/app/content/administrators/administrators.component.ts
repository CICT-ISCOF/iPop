import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../sign-in/sign-in.service'
import { UtilityService } from '../../utility.service'
import { ThrowStmt } from '@angular/compiler';

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
		this.setRandomImage()
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
		let hasError: boolean		
		for (let key in this.data) {		
			if( this.data[key] == "" || this.data[key] == null ){
				this.invalidData[key] = true
				hasError = true	
			}else{
				this.invalidData[key] = false
			}
		}	
		if(!hasError){	
			const formData = new FormData()		
			if (this.file != null) {
				formData.append('profile_picture', this.file, this.file.name); 
			}
			for(let key in this.data){
				formData.append(key, this.data[key]); 
			}
			this.SignInService.register(formData).subscribe(data => {	
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
			this.UtilityService.setAlert('One or more fields should not be empty', 'error')				
		}
		
	}


	triggerInput(){
		document.getElementById('profile-picture').click()
	}


	image :any
	file :File
	randomImages = [
		'../../../assets/avatars/boy-blue.png',
		'../../../assets/avatars/boyorange.png',
		'../../../assets/avatars/girl-black.png',
		'../../../assets/avatars/girl-orange.png'
	]

	setRandomImage(){
		this.image = this.randomImages[Math.floor(Math.random() * this.randomImages.length)];
	}

	readURL(files: FileList,event) {   
		this.file = files.item(0); 
			if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {
				this.image = event.target.result;           
			}
		}
	}

}

