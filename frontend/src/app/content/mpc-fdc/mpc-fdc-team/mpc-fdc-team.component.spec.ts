import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcFdcTeamComponent } from './mpc-fdc-team.component';

describe('MpcFdcTeamComponent', () => {
  let component: MpcFdcTeamComponent;
  let fixture: ComponentFixture<MpcFdcTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpcFdcTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcFdcTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
