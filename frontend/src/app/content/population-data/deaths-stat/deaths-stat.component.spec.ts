import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathsStatComponent } from './deaths-stat.component';

describe('DeathsStatComponent', () => {
  let component: DeathsStatComponent;
  let fixture: ComponentFixture<DeathsStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathsStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
