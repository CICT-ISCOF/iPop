import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhydTeamComponent } from './ahyd-team.component';

describe('AhydTeamComponent', () => {
  let component: AhydTeamComponent;
  let fixture: ComponentFixture<AhydTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhydTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhydTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
