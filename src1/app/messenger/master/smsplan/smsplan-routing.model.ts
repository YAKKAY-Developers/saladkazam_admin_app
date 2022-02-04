import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmsplanComponent } from "./smsplan.component";

const routes: Routes = [
  {
    path: "",
    component: SmsplanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsplanRoutermodule {}

