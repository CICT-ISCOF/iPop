import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMOCStatComponent } from './pmoc-stat.component';

describe('PMOCStatComponent', () => {
  let component: PMOCStatComponent;
  let fixture: ComponentFixture<PMOCStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMOCStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMOCStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
