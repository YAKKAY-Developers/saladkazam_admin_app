import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [CommonModule, AuthSignupRoutingModule, FormsModule, ToastModule],
  declarations: [AuthSignupComponent],
})
export class AuthSignupModule {}
