import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpadProAuthenticationComponent } from './ipad-pro-authentication.component';

describe('IpadProAuthenticationComponent', () => {
  let component: IpadProAuthenticationComponent;
  let fixture: ComponentFixture<IpadProAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpadProAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpadProAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
