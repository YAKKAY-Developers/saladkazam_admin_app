import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutermodule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
      CommonModule,
      DashboardRoutermodule,
      ButtonModule,
      
    ],
    providers: []
  })
  export class DashboardModule { }