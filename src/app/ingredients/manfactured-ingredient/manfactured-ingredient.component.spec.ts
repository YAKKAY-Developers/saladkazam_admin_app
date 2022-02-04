import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManfacturedIngredientComponent } from './manfactured-ingredient.component';

describe('ManfacturedIngredientComponent', () => {
  let component: ManfacturedIngredientComponent;
  let fixture: ComponentFixture<ManfacturedIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManfacturedIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManfacturedIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
