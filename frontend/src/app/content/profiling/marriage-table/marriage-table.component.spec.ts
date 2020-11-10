import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageTableComponent } from './marriage-table.component';

describe('MarriageTableComponent', () => {
  let component: MarriageTableComponent;
  let fixture: ComponentFixture<MarriageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
