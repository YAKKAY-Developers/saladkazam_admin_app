import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AllergenListComponent } from "./allergen-list.component";
import { SharedModule } from "src/app/theme/shared/shared.module";
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [{ path: "", component: AllergenListComponent }];

@NgModule({
  declarations: [AllergenListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbPaginationModule,
    NgbDropdownModule,
  ],
})
export class AllergenListModule {}
