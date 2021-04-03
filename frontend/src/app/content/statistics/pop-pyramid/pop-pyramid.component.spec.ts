import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopPyramidComponent } from './pop-pyramid.component';

describe('PopPyramidComponent', () => {
  let component: PopPyramidComponent;
  let fixture: ComponentFixture<PopPyramidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopPyramidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopPyramidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
