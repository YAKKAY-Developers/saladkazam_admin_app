import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManfacturedIngredientComponent } from './manfactured-ingredient.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: ManfacturedIngredientComponent }
];

@NgModule({
  declarations: [ManfacturedIngredientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbPaginationModule
  ],
  exports: [
    ManfacturedIngredientComponent
  ]
})
export class ManfacturedIngredientModule { }
