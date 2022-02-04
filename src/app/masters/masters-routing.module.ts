import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MastersComponent } from "./masters.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "restaurant",
        loadChildren: () =>
          import("./restaurant/restaurant.module").then(
            (module) => module.RestaurantModule
          ),
      },
      {
        path: "restaurant-location",
        loadChildren: () =>
          import("./restaurant-location/restaurant-location.module").then(
            (m) => m.RestaurantLocationModule
          ),
      },
      // { path: 'menu-item', loadChildren: () => import('./menu-item/menu-item.module').then(m => m.MenuItemModule) },
      {
        path: "allergen-list",
        loadChildren: () =>
          import("./allergen-list/allergen-list.module").then(
            (m) => m.AllergenListModule
          ),
      },
      {
        path: "categories",
        loadChildren: () =>
          import("./categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersRoutingModule {}
