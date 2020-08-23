import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInMigsComponent } from './table-in-migs.component';

describe('TableInMigsComponent', () => {
  let component: TableInMigsComponent;
  let fixture: ComponentFixture<TableInMigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableInMigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInMigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
