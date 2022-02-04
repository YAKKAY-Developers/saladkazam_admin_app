import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientgroupComponent } from "./clientgroup.component";

const routes: Routes = [
  {
    path: "",
    component: ClientgroupComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientgroupRoutermodule {}

