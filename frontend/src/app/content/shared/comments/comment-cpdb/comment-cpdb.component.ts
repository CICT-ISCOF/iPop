import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CpdbService } from '../../../cpdb/cpdb.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../../../../utility.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-comment-cpdb',
  templateUrl: './comment-cpdb.component.html',
  styleUrls: ['./comment-cpdb.component.scss']
})
export class CommentCpdbComponent implements OnInit {

	@ViewChild("textarea") textarea: ElementRef;

	ViewData = false

	select = {
		houseHoldSizeBrackets:[
			'1-3',
			'4-6',
			'7 and over'
		],

		RelationshiptoHouseholdHeads:[
			'Household Head',
			'Wife/Husband',
			'Son/Daughter',
			'Son-in-law/Daughter-in-law',
			'Grand Child (apo)',
			'Parent',
			'Parent-in-Law',
			'Brother/Sister',
			'Other Relatives (Uncle/aunt; cousins; grandparents)',
			'NO RELATION:  (househelpers;friends)',
			'Brother/Sister in Law',
		],

		Sexes:[
			'Male',
			'Female'
		],

		AgeBrackets:[
			'Below 1 year old',
			'1-4',
			'5-9',
			'10-14',
			'15-19',
			'20-24',
			'25-29',
			'30-34',
			'35-39',
			'40-44',
			'45-49',
			'50-54',
			'55-59',
			'60-64',
			'65-69',
			'70-74',
			'75-79',
			'80 and above',
		],

		CivilStatuses:[
			'Single',
			'Married (Kasado)',
			'Separated (legally) or /Divorced',
			'Common Law/Live-in',
			'Widow/er',
		],

		HighestEducationalAttainments:[
			'No Education',
			'Pre-school (Kinder or Day Care)',
			'Elementary Level (Grade 1 to 5)',
			'Elementary Grad (Completed Grade 6)',
			'High School Level (Grade 7-10)',
			'Senior High (Grade 11-12)',
			'High School Grad (completed 4th year High School)',
			'Tech "l/Vocl" (2-3 yr Course)',
			'College, Not Completed',
			'College Graduate',
			'Post Graduate (Masteral or Doctoral)',
			'ALS (Alternative Learning System)',
			'Not Applicable',			
		],

		SchoolAttendances:[
			'No',
			'Yes'
		],

		GradeYearLevelofSchoolAttendances:[
			'Pre-School',
			'Elementary',
			'Junior High School',
			'Senior High',
			'Techl"/Vocl"',
			'College',
			'Post Grad',
			'ALS',			
		],

		ReasonforNotAttendingSchools:[
			'Sickly/PWD',
			'Financial',
			'Pregnancy (nagbusong or nagpabusong)',
			'Got married/Lived-in',
			'Working for pay',
			'Not interested to go to school',
			'No documents for enrolment',
			'College grad',
			'Vocational grad',
			'Looking for work',
			'House far from school',		
			'Not applicable',
		],

		ReligiousAffiliations:[
			"R. Catholic",
			"Protestant",
			"Iglesia ni Kristo",
			"Seventh Day Adventist",
			"Aglipay",
			"Jehovah's Witness",
			"Islam",
			"Baptist",
			"Others (Born Again, Mormon, etc.)",
		],

		TypeofSpecialSkills:[
			'Carpentry',
			'Driving',
			'Dressmaking/ Tailoring',
			'Computer Operations',
			'Beauty Culture',
			'Food Processing',
			'Electrician',
			'Electronic tech',
			'Mechanic',
			'Welding',
			'Handicraft',
			'Performing Arts',
			'Visual Arts',
			'Sports',
		
		],

		TypeofDisabilities:[
			'Muskuloskeletal (kuing, kimpay, kulang kamot/tiil, paralitiko, poliohon)',
			'Motor Disability (cerebral palsy, epileptic, na stroke, dibilitating arthritis)',
			'Seeing Disability (bulag, hurapon)',
			'Hearing Disability (bungol, indi makabati)',
			'Mental Impairment (special child, Down syndrome, mentally retarded or mentally ill)',
			'Speech Disability (pitla, apa, bulol)',
			'Deformities (ponga, sungi, kuba/buktot)',
			'Multiple Disabilities (e.g. Deaf-mute)',			
		],

		NameofIndigenousorTribes:[
			'Sulodnon',
			'Ati',
			'Panayanon',
			'Bukidnon',
			
		],

		PhilHealthMemberships:[
			'NHTS',
			'4Ps',
			'Social Pensioner (Senior Citizen)',
			'Municipal Paid',
			'Employer-Private/Government',
			'Self Paid',			
		],

		UsualOccupationofWorkingHHMembers:[
			'Farming & related activities',
			'Fishing & related activities',
			'Sales/Business',
			'OFW (land-based)',
			'Employed in Government Office/Agency',
			'Employed in Private Firms',
			'Seafarer (Seaman)',
			'Practice of Profession',
			'Daily Wage Earner, laborers, services (on-call)',
			'Allotee/Remittance',
			'Pension',
			'Others:  Honorarium- Brgy Officials Brgy Volunteers, Tanod, etc',
			
		],

		IncomeBrackets : [
			'5,000 pesos & Below',
			'5001 - 15,000 pesos',
			'30,001 - 50,000 pesos',
			'50,000 pesos & Over',
		],

		PlaceofWorkorEmploymentoftheEarningHHMembers:[
			'Within the Barangay',
			'Within the Municipality',
			'Within the Province',
			'Within the Country',
			'Outside the Country (Abroad)',			
		],

		NoofYearsStayBrackets:[
			'Below 1 Year',
			'1-2',
			'3-4',
			'5 and over',
		],

		FPCurrentlyUseds:[
			'Tubal Ligation',
			'Vasectomy',
			'IUD',
			'Implant',
			'Injectable',
			'Pill',
			'Condom',
			"Billing's Ovulation Method",
			'Standard Days Method',
			'Basal Body Temperature',
			'Symptothermal Method',
			'Lactational Amenorrhea',
			'Traditional (Rhythm, Withdrawal, Abstinence, etc)',
			'None',
			
		],

		HouseholdIncomeBrackets:[
			'5,000 pesos & Below',
			'5001 - 15,000 pesos',
			'15,001 - 30,000 pesos',
			'30,001 - 50,000 pesos',
			'50,000 pesos & Over',			
		],

		HouseOwnerships:[
			'Owned',
			'Pay rent',
			'Stay for free',
		],

		Howmanystories:[
			'One',
			'Two',
			'More than two',			
		],

		HouseConstructionMaterials:[
			'Permanent (Mostly Concrete)',
			'Semi-permanent (Combination of concrete & wood)',
			'Temporary (Nipa, bamboo, cogon)',
			'Makeshift/shanty/improvised',			
		],

		HomelotOwnershipStatuses:[
			'Owned',
			'Rented',
			"With Owner's Consent",
			"Without owner's consent",
		],

		HHUsualSourceofWaterforDrinkings:[
			'Community Water System',
			'Deep Well with Pump (Tasok)',
			'Open Dug Well',
			'Covered Dugwell',
			'Water Refilling Station',
			'MIWD/LWUA',
			'Spring',
			'Rain Water',		
		],

		TypeofToilettheHouseholdwns:[
			'Water-sealed (with concrete septice tank)',
			'Water-sealed (WITHOUT septic tank)',
			'Closed-pit',
			'Communal/Public Toilet',
			'None/Shared',
		],

		HouseholdsGarbageDisposals: [
			'Composting',
			'Burning',
			'Burying',
			'Collected by Garbage Truck',
			'Thrown Anywhere',
			
		],

		TypeofFuelUseforLighting: [
			'Electricity',
			'Kerosene (Gas)',
			'Tap from nearby house',
			'Illegal Connection',
			'Generator Set',
			'Solar Panels',				
		],

		TypeofuelforCooking:[
			'Electricity',
			'Kerosene (Gas)',
			'LPG',
			'Wood/charcoal',			
		],


		HouseholdLocation:[
			'Landslide prone',
			'Along the riverbank',
			'Flood-prone',
			'Along the seashore/storm surge area',
			'Along faultline',
			'Along Road Slips',
			'Others, specify house hold location',			
		],

		WaterLevelinfloodpronearea:[
			'1/4 meter to below 1/2 meter high',
			'1/2 meter to below 1 meter',
			'1 meter and higher',			
		],

		AccesstoInformationTechnology:[
			'Cable Satellite services',
			'Internet Services',
			'Mobile service providers',		
		],
	}


	constructor(
		private CpdbService : CpdbService,
		private route:ActivatedRoute,
		private UtilityService: UtilityService,
		private Router: Router,
	) { }

	ngOnInit(): void {
		this.isLoading = true
		this.route.params.subscribe(data => {
			this.getRecord(data.id)
		});
		
	}
	isLoading = false

	theme = localStorage.getItem('data-theme')

	message

	field:any

	comments:any


	forps_beneficiary_household = 'tae'

	
	formatName(name){
		let newname = name.split(' ')
		newname = newname.join('')
		return newname
	}

	getRecord(id){
		this.CpdbService.getSpecificRecord(id).subscribe(data=>{
			this.field = data
			this.comments = data.comments
			this.isLoading = false	
			this.forps_beneficiary_household = data['4ps_beneficiary_household']			
			console.log('data',data)
		})
	}


	addComment(){
		let data = {
			body:this.message,
			type:'CPDB',
			commentable_id:this.field.id
		}
		this.CpdbService.addComment(data).subscribe(response => {
			this.UtilityService.setAlert('You have commented ' + this.message, 'success')
			this.message = ''
			this.ngOnInit()
		})
	}

	removeComment(id){			
		Swal.fire({
			title: 'Are you sure you want to remove this comment?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.CpdbService.removeComment(id).subscribe(data => {
					this.UtilityService.setAlert('You have remove a comment ', 'info')
					this.ngOnInit()
				})
			}		
		})	
	}

	updateRecord(){		
		Swal.fire({
			title: 'This will update existing data. Continue?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.field['4ps_beneficiary_household'] = this.forps_beneficiary_household
				this.CpdbService.updateRecord(this.field,this.field.id).subscribe(data => {
					this.UtilityService.setAlert('Record has been successfully updated ', 'info')
					this.field = data
				})
			}		
		})	
	}

	reply(){
		this.textarea.nativeElement.focus()
	}

	approve(){		
		Swal.fire({
			title: 'Countinue approving this data?' ,		
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: 'Approve',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				status = 'Approved'
				this.updateStatus(status)
			}		
		})	
	}

	disapprove(){
		Swal.fire({
			title: 'Are you sure you want to disapprove this data?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Disapprove',
			cancelButtonText: 'Nope'
			}).then((result) => {
			if (result.value) {
				status = 'Disapproved'
				this.updateStatus(status)
			}		
		})	
	}

	needsEditing(){
		status = 'Needs Editing'
		this.updateStatus(status)
	}

	noted(){
		status = 'Noted and will edit'
		this.updateStatus(status)
	}

	updateStatus(status){
		const id = this.field.record.id
		this.CpdbService.updateStatus(status,id).subscribe(data => {
			this.CpdbService.setRow()		
			this.ngOnInit()
		})
	}



}
