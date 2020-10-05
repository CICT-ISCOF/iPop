import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutMigsSearchComponent } from './out-migs-search.component';

describe('OutMigsSearchComponent', () => {
  let component: OutMigsSearchComponent;
  let fixture: ComponentFixture<OutMigsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutMigsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutMigsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
