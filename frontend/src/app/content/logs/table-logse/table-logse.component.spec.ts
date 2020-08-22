import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLogseComponent } from './table-logse.component';

describe('TableLogseComponent', () => {
  let component: TableLogseComponent;
  let fixture: ComponentFixture<TableLogseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableLogseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLogseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
