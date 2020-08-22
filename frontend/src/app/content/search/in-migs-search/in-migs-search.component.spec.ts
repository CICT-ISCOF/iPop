import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InMigsSearchComponent } from './in-migs-search.component';

describe('InMigsSearchComponent', () => {
  let component: InMigsSearchComponent;
  let fixture: ComponentFixture<InMigsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InMigsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InMigsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
