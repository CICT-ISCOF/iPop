import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordStatusDeathsComponent } from './record-status-deaths.component';

describe('RecordStatusDeathsComponent', () => {
  let component: RecordStatusDeathsComponent;
  let fixture: ComponentFixture<RecordStatusDeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordStatusDeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordStatusDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
