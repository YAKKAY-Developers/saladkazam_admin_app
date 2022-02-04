import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustclientsComponent } from "./custclients.component";

const routes: Routes = [
  {
    path: "",
    component: CustclientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustclientsRoutermodule {}

