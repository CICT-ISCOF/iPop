import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','home.component.inherit.cms.responsive.scss','home.tablet.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  role = localStorage.getItem('role')

  ngOnInit(): void {
  } 



}
