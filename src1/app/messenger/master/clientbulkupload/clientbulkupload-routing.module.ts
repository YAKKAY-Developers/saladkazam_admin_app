import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientbulkuploadComponent } from "./clientbulkupload.component";

const routes: Routes = [
  {
    path: "",
    component: ClientbulkuploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientbulkuploadRoutermodule {}

