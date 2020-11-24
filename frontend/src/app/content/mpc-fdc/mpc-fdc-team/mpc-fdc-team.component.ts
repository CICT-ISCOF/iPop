import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mpc-fdc-team',
  templateUrl: './mpc-fdc-team.component.html',
  styleUrls: ['./mpc-fdc-team.component.scss']
})
export class MpcFdcTeamComponent implements OnInit {

	constructor() { }

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

}
