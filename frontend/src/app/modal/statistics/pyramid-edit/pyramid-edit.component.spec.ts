import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyramidEditComponent } from './pyramid-edit.component';

describe('PyramidEditComponent', () => {
  let component: PyramidEditComponent;
  let fixture: ComponentFixture<PyramidEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyramidEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramidEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
