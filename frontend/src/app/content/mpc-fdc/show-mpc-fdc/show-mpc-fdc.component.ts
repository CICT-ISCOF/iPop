import { MPCFDCComponent } from './../mpc-fdc.component';
import { MpcService } from './../mpc.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-show-mpc-fdc',
  templateUrl: './show-mpc-fdc.component.html',
  styleUrls: ['./show-mpc-fdc.component.scss']
})
export class ShowMpcFdcComponent implements OnInit {

	constructor(
		private MpcService : MpcService,
		private MPCFDCComponent : MPCFDCComponent
	) {
		this.MpcService.getMPC().subscribe(data => {
			this.mpc = data
		})
	}


	mpc:any = JSON.parse(localStorage.getItem('mpc-ref'))

	ngOnInit(): void {

	}

	triggerInput(){
		document.getElementById('file').click()
	}

	readURL(files, event){
		this.mpc['files'] = []
		Object.keys(files).forEach(i => {				
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[i]);   		     
			reader.onload = (event) => {	
				this.mpc['files'].push( (<FileReader>event.target).result		)
				this.MpcService.updateMPC(this.mpc).subscribe(data => {
					console.log(data)
				})
			}	
		})
	}

	nl2br (str, is_xhtml) {
		if (typeof str === 'undefined' || str === null) {
			return '';
		}
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br /><br />' : '<br><br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}

















	customOptions: OwlOptions = {	
		center: true,
		items:2,
		loop:true,
		margin:0,
	   
		navSpeed: 700,
		autoplay:true,	
		autoplayTimeout:2000,
		responsive:{
			600:{
				items:1.3
			}
		}
	}

	back(){
		this.MPCFDCComponent.show = false
	}

}
