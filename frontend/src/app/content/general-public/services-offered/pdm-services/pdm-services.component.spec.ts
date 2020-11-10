import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDMServicesComponent } from './pdm-services.component';

describe('PDMServicesComponent', () => {
  let component: PDMServicesComponent;
  let fixture: ComponentFixture<PDMServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDMServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDMServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
