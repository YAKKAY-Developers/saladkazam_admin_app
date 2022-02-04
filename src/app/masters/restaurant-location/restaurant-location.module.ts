import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantLocationComponent } from './restaurant-location.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { IngredientComponent } from 'src/app/ingredients/ingredient/ingredient.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';


const routes: Routes = [
  { path: '', component: RestaurantLocationComponent }
];

@NgModule({
  declarations: [RestaurantLocationComponent, IngredientComponent, MenuItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    NgbTabsetModule,
    NgbPaginationModule,
    NgbDropdownModule
  ]
})
export class RestaurantLocationModule { }
