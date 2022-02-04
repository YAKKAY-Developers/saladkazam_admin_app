import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustclientsComponent } from './custclients.component';
import { CustclientsRoutermodule } from "./custclients-routing.model";
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
@NgModule({
    declarations: [CustclientsComponent],
    imports: [
      CommonModule,
      CustclientsRoutermodule,
      ButtonModule,
      ToastModule,
      RippleModule
    ],
    providers: []
  })
  export class CustclientsModule { }