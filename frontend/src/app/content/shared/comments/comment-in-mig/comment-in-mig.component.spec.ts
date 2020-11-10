import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentInMigComponent } from './comment-in-mig.component';

describe('CommentInMigComponent', () => {
  let component: CommentInMigComponent;
  let fixture: ComponentFixture<CommentInMigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentInMigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentInMigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
