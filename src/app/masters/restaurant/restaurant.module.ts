import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { RestaurantComponent } from "./restaurant.component";
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbProgressbarModule,
} from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "src/app/theme/shared/shared.module";
import { AddRestaurantComponent } from "./add-restaurant/add-restaurant.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: RestaurantComponent }];

@NgModule({
  declarations: [RestaurantComponent, AddRestaurantComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbDropdownModule,
    SharedModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    NgbPaginationModule,
    FormsModule,
  ],
})
export class RestaurantModule {}
