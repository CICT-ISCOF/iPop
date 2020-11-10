import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTCTeamComponent } from './mtc-team.component';

describe('MTCTeamComponent', () => {
  let component: MTCTeamComponent;
  let fixture: ComponentFixture<MTCTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTCTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTCTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
