import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientgroupassisgnComponent } from './ingredientgroupassisgn.component';

describe('IngredientgroupassisgnComponent', () => {
  let component: IngredientgroupassisgnComponent;
  let fixture: ComponentFixture<IngredientgroupassisgnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientgroupassisgnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientgroupassisgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
