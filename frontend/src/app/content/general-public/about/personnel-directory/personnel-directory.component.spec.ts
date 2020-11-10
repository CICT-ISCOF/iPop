import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDirectoryComponent } from './personnel-directory.component';

describe('PersonnelDirectoryComponent', () => {
  let component: PersonnelDirectoryComponent;
  let fixture: ComponentFixture<PersonnelDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
