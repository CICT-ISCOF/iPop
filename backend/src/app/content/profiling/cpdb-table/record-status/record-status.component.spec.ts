import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordStatusComponent } from './record-status.component';

describe('RecordStatusComponent', () => {
  let component: RecordStatusComponent;
  let fixture: ComponentFixture<RecordStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
