import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenCentersComponent } from './teen-centers.component';

describe('TeenCentersComponent', () => {
  let component: TeenCentersComponent;
  let fixture: ComponentFixture<TeenCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeenCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeenCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
