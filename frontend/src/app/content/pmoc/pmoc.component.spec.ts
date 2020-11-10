import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmocComponent } from './pmoc.component';

describe('PmocComponent', () => {
  let component: PmocComponent;
  let fixture: ComponentFixture<PmocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
