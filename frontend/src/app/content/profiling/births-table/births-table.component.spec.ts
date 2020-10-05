import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthsTableComponent } from './births-table.component';

describe('BirthsTableComponent', () => {
  let component: BirthsTableComponent;
  let fixture: ComponentFixture<BirthsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
