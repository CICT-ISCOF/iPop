import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-quick-links',
  templateUrl: './new-quick-links.component.html',
  styleUrls: ['./new-quick-links.component.scss']
})
export class NewQuickLinksComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	readURL(file,event){

	}

	triggerInput(){
		document.getElementById('quick-link-picture').click()
	}

}
