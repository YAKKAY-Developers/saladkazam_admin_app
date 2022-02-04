import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientbulkuploadComponent } from './clientbulkupload.component';

describe('ClientbulkuploadComponent', () => {
  let component: ClientbulkuploadComponent;
  let fixture: ComponentFixture<ClientbulkuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientbulkuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientbulkuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
