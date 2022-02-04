import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmstepmlateComponent } from "./smstepmlate.component";

const routes: Routes = [
  {
    path: "",
    component: SmstepmlateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmstepmlateRoutermodule {}