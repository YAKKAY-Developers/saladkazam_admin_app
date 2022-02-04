import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsplanComponent } from './smsplan.component';

describe('SmsplanComponent', () => {
  let component: SmsplanComponent;
  let fixture: ComponentFixture<SmsplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
