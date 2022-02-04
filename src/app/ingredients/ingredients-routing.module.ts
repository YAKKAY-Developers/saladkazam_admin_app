import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IngredientsComponent } from "./ingredients.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "category",
        loadChildren: () =>
          import("./ingredientcatorgy/ingredientcategory.module").then(
            (module) => module.IngredientcategoryModule
          ),
      },
      {
        path: "menu",
        loadChildren: () =>
          import("./ingredientmenu/ingredientmenu.module").then(
            (module) => module.IngredientmenuModule
          ),
      },
      {
        path: "group",
        loadChildren: () =>
          import("./ingredientgroupassisgn/ingredientgroupassisgn.module").then(
            (module) => module.IngredientgroupassisgnModule
          ),
      },
      // {
      //   path: "ingredient",
      //   loadChildren: () =>
      //     import("./ingredient/ingredient.module").then(
      //       (m) => m.IngredientModule
      //     ),
      // },
      {
        path: "manufactured-ingredient",
        loadChildren: () =>
          import("./manfactured-ingredient/manfactured-ingredient.module").then(
            (m) => m.ManfacturedIngredientModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule {}
