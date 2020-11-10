import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathsTableComponent } from './deaths-table.component';

describe('DeathsTableComponent', () => {
  let component: DeathsTableComponent;
  let fixture: ComponentFixture<DeathsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
