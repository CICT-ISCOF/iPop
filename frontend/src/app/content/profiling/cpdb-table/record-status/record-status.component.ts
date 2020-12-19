import { Component, OnInit } from '@angular/core';
import { CpdbService } from '../../../cpdb/cpdb.service'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-record-status',
  templateUrl: './record-status.component.html',
  styleUrls: ['./record-status.component.scss']
})
export class RecordStatusComponent implements OnInit {

  constructor(
    private CpdbService: CpdbService
  ) {

  }
  reload

  ngOnInit(): void {
  }

  theme = localStorage.getItem('data-theme')

  status = ''

  agInit(params: any) {
    this.status = params.data.record.status
  }

  refresh(params: any): boolean {
    this.status = params.data.record.status
    return true
  }


}
