import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayOfficialsComponent } from './barangay-officials.component';

describe('BarangayOfficialsComponent', () => {
  let component: BarangayOfficialsComponent;
  let fixture: ComponentFixture<BarangayOfficialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangayOfficialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangayOfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
