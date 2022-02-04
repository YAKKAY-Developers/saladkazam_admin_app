import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientgroupRoutermodule } from './clientgroup-routing.module';
import { ClientgroupComponent } from './clientgroup.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
@NgModule({
    declarations: [ClientgroupComponent],
    imports: [
        CommonModule,
        ClientgroupRoutermodule,
        ButtonModule,
        ToastModule,
        RippleModule
    ],
    providers: [MessageService]
})
export class ClientgroupModule { }