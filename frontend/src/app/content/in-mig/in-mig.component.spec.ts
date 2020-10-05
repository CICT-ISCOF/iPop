import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InMigComponent } from './in-mig.component';

describe('InMigComponent', () => {
  let component: InMigComponent;
  let fixture: ComponentFixture<InMigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InMigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InMigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
