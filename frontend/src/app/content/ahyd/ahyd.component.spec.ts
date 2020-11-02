import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhydComponent } from './ahyd.component';

describe('AhydComponent', () => {
  let component: AhydComponent;
  let fixture: ComponentFixture<AhydComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhydComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhydComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
