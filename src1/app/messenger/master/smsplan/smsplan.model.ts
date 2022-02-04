import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsplanComponent } from './smsplan.component';
import { SmsplanRoutermodule } from './smsplan-routing.model';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
@NgModule({
  declarations: [SmsplanComponent],
  imports: [
    CommonModule,
    SmsplanRoutermodule,
    ButtonModule,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
})
export class SmsplanModel {}
