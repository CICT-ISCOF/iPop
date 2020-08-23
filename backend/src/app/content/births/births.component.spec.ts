import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthsComponent } from './births.component';

describe('BirthsComponent', () => {
  let component: BirthsComponent;
  let fixture: ComponentFixture<BirthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
