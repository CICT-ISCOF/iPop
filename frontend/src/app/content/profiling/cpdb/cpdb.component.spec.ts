import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdbComponent } from './cpdb.component';

describe('CpdbComponent', () => {
  let component: CpdbComponent;
  let fixture: ComponentFixture<CpdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
