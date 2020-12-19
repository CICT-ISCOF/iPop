import { MPCFDCComponent } from './../mpc-fdc.component';
import { MpcService } from './../mpc.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mpc-fdc-team',
  templateUrl: './mpc-fdc-team.component.html',
  styleUrls: ['./mpc-fdc-team.component.scss']
})
export class MpcFdcTeamComponent implements OnInit {

	constructor(
		private MpcService : MpcService
	) { }

	ngOnInit(): void {

	}

	addTeam = false
	addFocalPerson = false

	focalPerson = {
		name:''
	}

	createFocalPerson(){

	}

	getFocalPerson(){

	}

	updateTFocalPerson(){

	}
	
	deleteFocalPerson(){
		Swal.fire({
			title: 'Are you sure you want to this Focal Person?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove Service',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				//butang di ya code ja,m
			} 
		})
	}



	createTeam(){

	}

	getTeams(){

	}

	updateTeam(){

	}
	
	deleteTeam(){
		Swal.fire({
			title: 'Are you sure you want to this Team Member?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove Team MemberFocalPerson',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				//butang di ya code ja,m
			} 
		})
	}

	acitveFocalPersons = {}

	toggleFocalPersons(focalPersonID){		
		this.acitveFocalPersons[focalPersonID] == true ?  this.acitveFocalPersons[focalPersonID] = false : this.acitveFocalPersons[focalPersonID] = true	
		console.log(this.acitveFocalPersons[focalPersonID])		
	}

	triggerFileInput(id){
		document.getElementById(id).click()
	}

	placeholder:any = '../../../../assets/avatars/boy-blue.png'
	readURL(file, event){	
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {		
				this.placeholder = (<FileReader>event.target).result
				this.MPCFDCTeam['photo'] =  (<FileReader>event.target).result
			}
		}		
	}


	MPCFDCTeam = {
		name:'',
		position:''
	}
	saveTeam(){
		this.MpcService.create(this.MPCFDCTeam).subscribe(data => {

		})
	}

}
