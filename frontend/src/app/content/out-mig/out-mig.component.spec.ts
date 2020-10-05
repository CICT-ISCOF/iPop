import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutMigComponent } from './out-mig.component';

describe('OutMigComponent', () => {
  let component: OutMigComponent;
  let fixture: ComponentFixture<OutMigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutMigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutMigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
