import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutermodule } from './customer-routing.model';
import { CustomerComponent } from './customer.component';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
@NgModule({
    declarations: [CustomerComponent],
    imports: [
      CommonModule,
      CustomerRoutermodule,
      ButtonModule,
      ToastModule,
      RippleModule
    ],
    providers: [MessageService]
  })
  export class CustomerModule { }