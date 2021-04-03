import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPopulatedComponent } from './top-populated.component';

describe('TopPopulatedComponent', () => {
  let component: TopPopulatedComponent;
  let fixture: ComponentFixture<TopPopulatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPopulatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPopulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
