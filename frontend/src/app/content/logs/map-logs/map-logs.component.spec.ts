import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLogsComponent } from './map-logs.component';

describe('MapLogsComponent', () => {
  let component: MapLogsComponent;
  let fixture: ComponentFixture<MapLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
