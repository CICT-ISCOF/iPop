import { UserService } from '../../../others/user.service';
import { UtilityService } from '../../../others/utility.service';
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
		private UtilityService : UtilityService,
		private UserService : UserService
	) { }
 
	ngOnInit(): void {
	
		this.getTeams()
		this.getFocalPerson()
	}

	isUser =  !this.UserService.isUser()

	addTeam = false
	addFocalPerson = false

	focalPerson = {
		name:''
	}

	focalPersons = []
	getFocalPerson(){	
		this.TeenCentersService.retrieve().subscribe(data => {
			this.focalPersons =  data.data		
		})
	}
	
	createFocalPerson(){
		this.TeenCentersService.create(this.focalPerson).subscribe(data => {
			this.UtilityService.setAlert('New Focal Person has been added','success')
			this.ngOnInit()
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
					this.UtilityService.setAlert(`${focalPerson['name']} has been updated`,'info')
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
					this.UtilityService.setAlert('A Focal Person has been removed','info')
				})
			} 
		})
	}


	ahydTeam = {
		name:'',
		posotion:'',
	}

	ahydTeams = []


	getTeams(){
		this.TeenCentersService.retrieveTeam().subscribe(data => {
			this.ahydTeams = data.data			
		})
	}

	createTeam(){
		this.TeenCentersService.createTeam(this.ahydTeam).subscribe(data => {
			this.ngOnInit()
			this.UtilityService.setAlert('New AHYD Team has been added','success')
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
					this.UtilityService.setAlert(`${team['name']} has been updated`,'info')
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
					this.UtilityService.setAlert('An AHYD has been removed','info')
				})
			}
		})
	}

	acitveFocalPersons = {}

	toggleFocalPersons(focalPersonID){		
		this.acitveFocalPersons[focalPersonID] == true ?  this.acitveFocalPersons[focalPersonID] = false : this.acitveFocalPersons[focalPersonID] = true	
		console.log(this.acitveFocalPersons[focalPersonID])		
	}


	activeTeams = {}

	toggleTeams(id){		
		this.activeTeams[id] == true ?  this.activeTeams[id] = false : this.activeTeams[id] = true	
		console.log(this.activeTeams[id])		
	}

}
