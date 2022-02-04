import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MastersComponent } from './masters.component';
import { MastersRoutingModule } from './masters-routing.module';
import { SharedModule } from '../theme/shared/shared.module';


@NgModule({
  declarations: [MastersComponent],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule
  ]
})
export class MastersModule { }
