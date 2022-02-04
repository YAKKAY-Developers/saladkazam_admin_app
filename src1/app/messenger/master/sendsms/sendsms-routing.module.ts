import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SendsmsComponent } from "./sendsms.component";

const routes: Routes = [
  {
    path: "",
    component: SendsmsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendsmsRoutermodule {}

