import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTeenCentersComponent } from './show-teen-centers.component';

describe('ShowTeenCentersComponent', () => {
  let component: ShowTeenCentersComponent;
  let fixture: ComponentFixture<ShowTeenCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTeenCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTeenCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
