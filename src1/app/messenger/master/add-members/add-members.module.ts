import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMembersRoutingModule } from './add-members-routing.module';
import { AddMembersComponent } from './add-members.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AddMembersComponent],
  imports: [
    CommonModule,
    AddMembersRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ToastModule,
  ],
})
export class AddMembersModule {}
