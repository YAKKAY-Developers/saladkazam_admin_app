import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientmenuComponent } from './ingredientmenu.component';

describe('IngredientmenuComponent', () => {
  let component: IngredientmenuComponent;
  let fixture: ComponentFixture<IngredientmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
