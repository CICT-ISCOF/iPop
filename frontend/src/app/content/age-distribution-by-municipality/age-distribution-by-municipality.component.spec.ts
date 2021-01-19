import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDistributionByMunicipalityComponent } from './age-distribution-by-municipality.component';

describe('AgeDistributionByMunicipalityComponent', () => {
  let component: AgeDistributionByMunicipalityComponent;
  let fixture: ComponentFixture<AgeDistributionByMunicipalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeDistributionByMunicipalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeDistributionByMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
