import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendsmsRoutermodule } from './sendsms-routing.module';
import { SendsmsComponent } from './sendsms.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FilterService, MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [SendsmsComponent],
    imports: [
        CommonModule,
        SendsmsRoutermodule,
        ButtonModule,
        ToastModule,
        RippleModule,
        TabViewModule,
        TableModule,
        FormsModule,
        DropdownModule,
        MultiSelectModule
    ],
    providers: [MessageService,FilterService]
})
export class SendsmsModule { }