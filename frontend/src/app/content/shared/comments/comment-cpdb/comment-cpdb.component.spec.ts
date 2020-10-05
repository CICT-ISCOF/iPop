import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCpdbComponent } from './comment-cpdb.component';

describe('CommentCpdbComponent', () => {
  let component: CommentCpdbComponent;
  let fixture: ComponentFixture<CommentCpdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCpdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCpdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
