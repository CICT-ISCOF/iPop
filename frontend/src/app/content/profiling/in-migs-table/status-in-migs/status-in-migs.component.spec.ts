import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusInMigsComponent } from './status-in-migs.component';

describe('StatusInMigsComponent', () => {
  let component: StatusInMigsComponent;
  let fixture: ComponentFixture<StatusInMigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusInMigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusInMigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
