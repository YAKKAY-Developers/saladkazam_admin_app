import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IngredientcatorgyComponent } from './ingredientcatorgy.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: IngredientcatorgyComponent }
];

@NgModule({
  declarations: [IngredientcatorgyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbDropdownModule
  ]
})
export class IngredientcategoryModule { }
