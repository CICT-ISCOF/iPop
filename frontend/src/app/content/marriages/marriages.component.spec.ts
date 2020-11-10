import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriagesComponent } from './marriages.component';

describe('MarriagesComponent', () => {
  let component: MarriagesComponent;
  let fixture: ComponentFixture<MarriagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
