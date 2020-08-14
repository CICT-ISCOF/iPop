import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InMigsTableComponent } from './in-migs-table.component';

describe('InMigsTableComponent', () => {
  let component: InMigsTableComponent;
  let fixture: ComponentFixture<InMigsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InMigsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InMigsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
