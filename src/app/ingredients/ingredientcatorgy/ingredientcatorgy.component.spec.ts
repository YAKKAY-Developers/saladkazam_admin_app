import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientcatorgyComponent } from './ingredientcatorgy.component';

describe('IngredientcatorgyComponent', () => {
  let component: IngredientcatorgyComponent;
  let fixture: ComponentFixture<IngredientcatorgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientcatorgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientcatorgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
