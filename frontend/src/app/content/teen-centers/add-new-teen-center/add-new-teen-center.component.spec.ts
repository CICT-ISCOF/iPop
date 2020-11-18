import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTeenCenterComponent } from './add-new-teen-center.component';

describe('AddNewTeenCenterComponent', () => {
  let component: AddNewTeenCenterComponent;
  let fixture: ComponentFixture<AddNewTeenCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTeenCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTeenCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
