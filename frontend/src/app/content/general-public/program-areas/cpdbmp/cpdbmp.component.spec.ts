import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPDBMPComponent } from './cpdbmp.component';

describe('CPDBMPComponent', () => {
  let component: CPDBMPComponent;
  let fixture: ComponentFixture<CPDBMPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPDBMPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPDBMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
