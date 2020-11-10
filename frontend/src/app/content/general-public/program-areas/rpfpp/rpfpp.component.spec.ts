import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPFPPComponent } from './rpfpp.component';

describe('RPFPPComponent', () => {
  let component: RPFPPComponent;
  let fixture: ComponentFixture<RPFPPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPFPPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPFPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
