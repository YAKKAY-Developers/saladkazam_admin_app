import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMembersRoutingModule } from './team-members-routing.module';
import { TeamMembersComponent } from './team-members.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxCaptureModule } from 'ngx-capture';

@NgModule({
  declarations: [TeamMembersComponent],
  imports: [
    CommonModule,
    TeamMembersRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    NgxCaptureModule,
  ],
})
export class TeamMembersModule {}
