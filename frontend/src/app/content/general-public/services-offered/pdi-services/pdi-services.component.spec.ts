import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDIServicesComponent } from './pdi-services.component';

describe('PDIServicesComponent', () => {
  let component: PDIServicesComponent;
  let fixture: ComponentFixture<PDIServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDIServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDIServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
