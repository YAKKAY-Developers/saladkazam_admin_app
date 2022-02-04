import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbPaginationModule
  ]
})
export class CategoriesModule { }
