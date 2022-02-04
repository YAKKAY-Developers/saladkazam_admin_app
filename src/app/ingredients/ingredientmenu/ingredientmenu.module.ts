import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IngredientmenuComponent } from './ingredientmenu.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: IngredientmenuComponent }
];

@NgModule({
  declarations: [IngredientmenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbDropdownModule
  ]
})
export class IngredientmenuModule { }
