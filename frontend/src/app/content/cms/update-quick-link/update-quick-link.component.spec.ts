import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuickLinkComponent } from './update-quick-link.component';

describe('UpdateQuickLinkComponent', () => {
  let component: UpdateQuickLinkComponent;
  let fixture: ComponentFixture<UpdateQuickLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuickLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuickLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
