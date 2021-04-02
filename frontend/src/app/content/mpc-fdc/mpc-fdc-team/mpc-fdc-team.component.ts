import { UserService } from '../../../others/user.service';
import { FocalPersonsService } from './../focal-persons.service';
import { UtilityService } from '../../../others/utility.service';
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
		private MpcService : MpcService,
		private UtilityService : UtilityService,
		private FocalPersonsService  :FocalPersonsService,
		private UserService  :UserService,
	) { }

	isUser =  !this.UserService.isUser()

	ngOnInit(): void {
		this.getTeams()
		this.retrieveFocalPersons()
	}

	addTeam = false
	addFocalPerson = false

	focalPerson = {
		name:''
	}


	teams = []
	createTeam(){
		
	}

	getTeams(){
		this.MpcService.retrieve().subscribe(data => {
			this.teams = data.data
		})
	}

	updateTeam(team){
		let temPhoto = team['photo']
		team['photo'] = null
		this.MpcService.update(team['id'],team).subscribe(data => {
			this.UtilityService.setAlert(`${team['name']} has been updated`,'info')
			this.ngOnInit()
			team['photo'] = temPhoto
			this.editTeam(team)
		})
	}

	acitveTeams = {}
	editTeam(team){
		this.acitveTeams[team.id] == true ?  this.acitveTeams[team.id] = false : this.acitveTeams[team.id] = true	
	}
	
	deleteTeam(team){
		Swal.fire({
			title: 'Are you sure you want to this Team Member?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove Team MemberFocalPerson',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.MpcService.deleteTeam(team['id']).subscribe(data => {
					this.UtilityService.setAlert(`${team['name']} has been removed`,'info')
					this.ngOnInit()
				})
			} 
		})
	}

	acitveFocalPersons = {}

	toggleFocalPersons(focalPersonID){		
		this.acitveFocalPersons[focalPersonID] == true ?  this.acitveFocalPersons[focalPersonID] = false : this.acitveFocalPersons[focalPersonID] = true	
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
			this.UtilityService.setAlert('New Team has been added','success')
			this.ngOnInit()
		},
		(error) => {
			for (let message in error.error.errors) {
			  this.UtilityService.setAlert(error.error.errors[message], 'error');
			}
		})
	}


	focalPeson = {
		name:''
	}
	focalPesons = []
	createFocalPersons(){
		this.FocalPersonsService.create(this.focalPerson).subscribe(data => {
			this.UtilityService.setAlert('New Focal Person has been added','success')
			this.ngOnInit()
		})
	}

	retrieveFocalPersons(){
		this.FocalPersonsService.retrieve().subscribe(data => {
			this.focalPesons = data.data
		})
	}

	updateFocalPersons(focalPerson){
		this.FocalPersonsService.update(focalPerson).subscribe(data => {
			this.UtilityService.setAlert('Focal Person has been updated','success')
			this.ngOnInit()
		})
	}

	deleteFocalPerson(id){
		Swal.fire({
			title: 'Are you sure you want to this Focal Person?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove Service',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.FocalPersonsService.deleteFocalPerson(id).subscribe(data => {
					this.UtilityService.setAlert('Focal Person has been deleted','success')
					this.ngOnInit()
				})
			} 
		})
		
	}






}
