import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenListComponent } from './allergen-list.component';

describe('AllergenListComponent', () => {
  let component: AllergenListComponent;
  let fixture: ComponentFixture<AllergenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
