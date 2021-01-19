import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationProfileByMunicipalityComponent } from './population-profile-by-municipality.component';

describe('PopulationProfileByMunicipalityComponent', () => {
  let component: PopulationProfileByMunicipalityComponent;
  let fixture: ComponentFixture<PopulationProfileByMunicipalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationProfileByMunicipalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationProfileByMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
