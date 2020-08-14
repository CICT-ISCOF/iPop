import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutMigsTableComponent } from './out-migs-table.component';

describe('OutMigsTableComponent', () => {
  let component: OutMigsTableComponent;
  let fixture: ComponentFixture<OutMigsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutMigsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutMigsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
