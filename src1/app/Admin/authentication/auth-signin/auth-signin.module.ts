import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    FormsModule,
    ToastModule,
  ],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
