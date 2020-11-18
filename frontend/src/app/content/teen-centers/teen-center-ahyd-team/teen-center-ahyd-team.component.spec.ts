import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenCenterAhydTeamComponent } from './teen-center-ahyd-team.component';

describe('TeenCenterAhydTeamComponent', () => {
  let component: TeenCenterAhydTeamComponent;
  let fixture: ComponentFixture<TeenCenterAhydTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeenCenterAhydTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeenCenterAhydTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
