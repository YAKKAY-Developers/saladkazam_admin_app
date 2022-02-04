import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMembersComponent } from './add-members.component';

const routes: Routes = [{ path: '', component: AddMembersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMembersRoutingModule { }
