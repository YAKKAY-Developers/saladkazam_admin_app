import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutermodule } from './users-routing.model';
import { UsersComponent } from './users.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutermodule,
    ButtonModule,
    ToastModule,
    RippleModule,
    FormsModule,
  ],
  providers: [MessageService],
})
export class UsersModule {}
