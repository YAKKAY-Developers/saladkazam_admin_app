import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientgroupComponent } from './clientgroup.component';

describe('ClientgroupComponent', () => {
  let component: ClientgroupComponent;
  let fixture: ComponentFixture<ClientgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
