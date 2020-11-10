import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentMarriagesComponent } from './comment-marriages.component';

describe('CommentMarriagesComponent', () => {
  let component: CommentMarriagesComponent;
  let fixture: ComponentFixture<CommentMarriagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentMarriagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentMarriagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
