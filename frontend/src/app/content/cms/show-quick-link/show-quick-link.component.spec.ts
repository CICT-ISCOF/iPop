import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuickLinkComponent } from './show-quick-link.component';

describe('ShowQuickLinkComponent', () => {
  let component: ShowQuickLinkComponent;
  let fixture: ComponentFixture<ShowQuickLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQuickLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuickLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
