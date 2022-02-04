import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustclientsComponent } from './custclients.component';

describe('CustclientsComponent', () => {
  let component: CustclientsComponent;
  let fixture: ComponentFixture<CustclientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustclientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
