import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyramidAddComponent } from './pyramid-add.component';

describe('PyramidAddComponent', () => {
  let component: PyramidAddComponent;
  let fixture: ComponentFixture<PyramidAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyramidAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramidAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
