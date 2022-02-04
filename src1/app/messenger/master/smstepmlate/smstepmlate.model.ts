import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmstepmlateComponent } from './smstepmlate.component';
import { SmstepmlateRoutermodule } from './smstepmlate-routing.model';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
@NgModule({
    declarations: [SmstepmlateComponent],
    imports: [
      CommonModule,
      SmstepmlateRoutermodule,
      ButtonModule,
      ToastModule,
      RippleModule
    ],
    providers: [MessageService]
  })
  export class SmstepmlateModel { }