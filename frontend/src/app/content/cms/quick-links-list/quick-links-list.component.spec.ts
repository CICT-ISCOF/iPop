import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLinksListComponent } from './quick-links-list.component';

describe('QuickLinksListComponent', () => {
  let component: QuickLinksListComponent;
  let fixture: ComponentFixture<QuickLinksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickLinksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickLinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
