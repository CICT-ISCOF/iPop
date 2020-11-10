import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpoMandateComponent } from './ppo-mandate.component';

describe('PpoMandateComponent', () => {
  let component: PpoMandateComponent;
  let fixture: ComponentFixture<PpoMandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpoMandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpoMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
