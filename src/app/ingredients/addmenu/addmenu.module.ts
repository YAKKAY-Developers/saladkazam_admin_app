import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddmenuComponent } from './addmenu.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: AddmenuComponent }
];

@NgModule({
  declarations: [AddmenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbDropdownModule
  ]
})
export class AddmenuModule { }
