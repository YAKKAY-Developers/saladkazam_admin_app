import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutermodule } from './event-routing.module';
import { EventComponent } from './event.component';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
@NgModule({
    declarations: [EventComponent],
    imports: [
      CommonModule,
      EventRoutermodule,
      ButtonModule,
      ToastModule,
      RippleModule
    ],
    providers: [MessageService]
  })
  export class EventModule { }