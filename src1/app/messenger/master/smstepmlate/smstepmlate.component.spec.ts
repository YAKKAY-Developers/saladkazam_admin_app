import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmstepmlateComponent } from './smstepmlate.component';

describe('SmstepmlateComponent', () => {
  let component: SmstepmlateComponent;
  let fixture: ComponentFixture<SmstepmlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmstepmlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmstepmlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
