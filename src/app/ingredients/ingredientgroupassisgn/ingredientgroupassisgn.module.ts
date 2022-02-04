import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IngredientgroupassisgnComponent } from './ingredientgroupassisgn.component';


const routes: Routes = [
  { path: '', component: IngredientgroupassisgnComponent }
];

@NgModule({
  declarations: [IngredientgroupassisgnComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class IngredientgroupassisgnModule { }
