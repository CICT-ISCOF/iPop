import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopProfileComponent } from './pop-profile.component';

describe('PopProfileComponent', () => {
  let component: PopProfileComponent;
  let fixture: ComponentFixture<PopProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
