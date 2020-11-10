import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesAndConcernsComponent } from './issues-and-concerns.component';

describe('IssuesAndConcernsComponent', () => {
  let component: IssuesAndConcernsComponent;
  let fixture: ComponentFixture<IssuesAndConcernsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesAndConcernsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesAndConcernsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
