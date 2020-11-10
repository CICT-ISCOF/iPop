import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AHYDPComponent } from './ahydp.component';

describe('AHYDPComponent', () => {
  let component: AHYDPComponent;
  let fixture: ComponentFixture<AHYDPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AHYDPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AHYDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
