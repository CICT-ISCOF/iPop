import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOutMigsComponent } from './status-out-migs.component';

describe('StatusOutMigsComponent', () => {
  let component: StatusOutMigsComponent;
  let fixture: ComponentFixture<StatusOutMigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusOutMigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOutMigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
