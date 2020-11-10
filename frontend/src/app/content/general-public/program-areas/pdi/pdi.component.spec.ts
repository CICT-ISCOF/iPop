import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDIComponent } from './pdi.component';

describe('PDIComponent', () => {
  let component: PDIComponent;
  let fixture: ComponentFixture<PDIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
