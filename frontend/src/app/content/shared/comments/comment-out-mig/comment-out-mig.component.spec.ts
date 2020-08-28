import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentOutMigComponent } from './comment-out-mig.component';

describe('CommentOutMigComponent', () => {
  let component: CommentOutMigComponent;
  let fixture: ComponentFixture<CommentOutMigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentOutMigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentOutMigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
