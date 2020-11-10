import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincialOfficialsComponent } from './provincial-officials.component';

describe('ProvincialOfficialsComponent', () => {
  let component: ProvincialOfficialsComponent;
  let fixture: ComponentFixture<ProvincialOfficialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvincialOfficialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincialOfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
