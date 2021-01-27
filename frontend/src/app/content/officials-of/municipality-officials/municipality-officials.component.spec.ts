import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityOfficialsComponent } from './municipality-officials.component';

describe('MunicipalityOfficialsComponent', () => {
  let component: MunicipalityOfficialsComponent;
  let fixture: ComponentFixture<MunicipalityOfficialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipalityOfficialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityOfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
