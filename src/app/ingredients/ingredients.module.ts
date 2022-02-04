import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IngredientsComponent } from './ingredients.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { SharedModule } from '../theme/shared/shared.module';


@NgModule({
  declarations: [IngredientsComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    SharedModule
  ]
})
export class IngredientsModule { }
