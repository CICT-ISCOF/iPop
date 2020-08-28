import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBirthsComponent } from './comment-births.component';

describe('CommentBirthsComponent', () => {
  let component: CommentBirthsComponent;
  let fixture: ComponentFixture<CommentBirthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentBirthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBirthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
