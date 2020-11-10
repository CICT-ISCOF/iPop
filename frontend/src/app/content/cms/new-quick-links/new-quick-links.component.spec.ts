import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuickLinksComponent } from './new-quick-links.component';

describe('NewQuickLinksComponent', () => {
  let component: NewQuickLinksComponent;
  let fixture: ComponentFixture<NewQuickLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuickLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuickLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
