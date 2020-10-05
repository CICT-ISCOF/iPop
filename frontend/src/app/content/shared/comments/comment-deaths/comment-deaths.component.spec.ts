import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDeathsComponent } from './comment-deaths.component';

describe('CommentDeathsComponent', () => {
  let component: CommentDeathsComponent;
  let fixture: ComponentFixture<CommentDeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentDeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
