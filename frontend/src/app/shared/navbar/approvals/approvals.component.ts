import { ApprovalsService } from './approvals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

	constructor(
		private ApprovalsService : ApprovalsService
	) { }

	ngOnInit(): void {
		this.getApprovals()
	}

	appendedPages = 1
	approvals = []

	getApprovals(){
		this.ApprovalsService.getApprovals().subscribe(data =>{
			this.approvals = data.data
		})
	}

	paginate(){
		this.appendedPages += 1
		this.ApprovalsService.paginate(	this.appendedPages ).subscribe(data => {
			this.approvals.push(data.data)
		})
	}
    
    approve(id) {
        this.ApprovalsService.approve( id ).subscribe( data => {
            this.ngOnInit()
        })
    }
    
    reject(id) {
        this.ApprovalsService.reject( id ).subscribe( data => {
this.ngOnInit()
        } )
    }

}
