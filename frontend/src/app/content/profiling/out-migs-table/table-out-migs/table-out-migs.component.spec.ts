import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOutMigsComponent } from './table-out-migs.component';

describe('TableOutMigsComponent', () => {
  let component: TableOutMigsComponent;
  let fixture: ComponentFixture<TableOutMigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOutMigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOutMigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
