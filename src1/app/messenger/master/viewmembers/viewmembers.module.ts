import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewmembersComponent } from './viewmembers.component';
import { ViewmembersRoutingModule } from './viewmembers-routing.module';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ViewmembersComponent],
  imports: [FormsModule,
    CommonModule,ViewmembersRoutingModule
  ]
})
export class ViewmembersModule { }
