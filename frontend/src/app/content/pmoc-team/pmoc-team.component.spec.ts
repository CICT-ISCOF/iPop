import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmocTeamComponent } from './pmoc-team.component';

describe('PmocTeamComponent', () => {
  let component: PmocTeamComponent;
  let fixture: ComponentFixture<PmocTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmocTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmocTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
