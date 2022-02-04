import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientbulkuploadRoutermodule } from './clientbulkupload-routing.module';
import { ClientbulkuploadComponent } from './clientbulkupload.component';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
@NgModule({
    declarations: [ClientbulkuploadComponent],
    imports: [
      CommonModule,
      ClientbulkuploadRoutermodule,
      ButtonModule,
      ToastModule,
      RippleModule
    ],
    providers: [MessageService]
  })
  export class ClientbulkuploadModule { }