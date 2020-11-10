import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthsStatComponent } from './births-stat.component';

describe('BirthsStatComponent', () => {
  let component: BirthsStatComponent;
  let fixture: ComponentFixture<BirthsStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthsStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
