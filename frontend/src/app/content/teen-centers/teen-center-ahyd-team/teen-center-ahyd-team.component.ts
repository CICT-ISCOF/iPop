import { UtilityService } from './../../../utility.service';
import { TeenCentersService } from './../teen-centers.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-teen-center-ahyd-team',
  templateUrl: './teen-center-ahyd-team.component.html',
  styleUrls: ['./teen-center-ahyd-team.component.scss']
})
export class TeenCenterAhydTeamComponent implements OnInit {

	constructor(
		private TeenCentersService : TeenCentersService,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {
	
		this.getTeams()
		this.getFocalPerson()
	}

	addTeam = false
	addFocalPerson = false

	focalPerson = {
		name:''
	}

	focalPersons = []
	createFocalPerson(){
		this.TeenCentersService.create(this.focalPerson).subscribe(data => {
			this.UtilityService.setAlert('New Focal Person has been added','success')
			this.ngOnInit()
		})
	}

	getFocalPerson(){	
		this.TeenCentersService.retrieve().subscribe(data => {
			this.focalPersons = data
		})
	}

	updateTFocalPerson(focalPerson){
		Swal.fire({
			title: 'Are you sure you want to update this focal Person?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Later'
			}).then((result) => {
			if (result.value) {
				this.TeenCentersService.update(focalPerson,focalPerson['id']).subscribe(data => {
					this.ngOnInit()
				})
			} 
		})

	}
	
	deleteFocalPerson(id){
		Swal.fire({
			title: 'Are you sure you want to this Focal Person?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
			}).then((result) => {
			if (result.value) {
				this.TeenCentersService.deleteFocalPerson(id).subscribe(data => {
					this.ngOnInit()
				})
			} 
		})
	}


	ahydTeam = {
		name:'',
		posotion:'',
	}

	ahydTeams = []

	createTeam(){
		this.TeenCentersService.createTeam(this.ahydTeam).subscribe(data => {
			this.ngOnInit()
			this.UtilityService.setAlert('New AHYD Team has been added','success')
		})
	}

	getTeams(){
		this.TeenCentersService.retrieveTeam().subscribe(data => {
			this.ahydTeams = data			
		})
	}

	updateTeam(team){
		Swal.fire({
			title: 'Are you sure you want Update this data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Nope'
			}).then((result) => {
			if (result.value) {
				this.TeenCentersService.updateTeam(team).subscribe(data => {
					this.ngOnInit()		
				})
			} 
		})		
	}
	
	deleteTeam(id){
		Swal.fire({
			title: 'Are you sure you want to remove this data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
			}).then((result) => {
				if (result.value) {
					this.TeenCentersService.deleteAHYDTeam(id).subscribe(data => {
					this.ngOnInit()		
				})
			}
		})
	}

	acitveFocalPersons = {}

	toggleFocalPersons(focalPersonID){		
		this.acitveFocalPersons[focalPersonID] == true ?  this.acitveFocalPersons[focalPersonID] = false : this.acitveFocalPersons[focalPersonID] = true	
		console.log(this.acitveFocalPersons[focalPersonID])		
	}

}
