import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [CommonModule, FeedbackRoutingModule, FormsModule, ToastModule],
})
export class FeedbackModule {}
