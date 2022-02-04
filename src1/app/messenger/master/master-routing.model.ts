import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'customer',
        loadChildren: () =>
          import('src/app/messenger/master/customer/customer.module').then(
            (module) => module.CustomerModule
          ),
      },
      {
        path: 'customer/:id',
        loadChildren: () =>
          import('src/app/messenger/master/customer/customer.module').then(
            (module) => module.CustomerModule
          ),
      },
      {
        path: 'customerClients',
        loadChildren: () =>
          import('src/app/messenger/master/custclients/custclients.model').then(
            (module) => module.CustclientsModule
          ),
      },
      {
        path: 'Clientgroup',
        loadChildren: () =>
          import(
            'src/app/messenger/master/clientgroup/clientgroup.module'
          ).then((module) => module.ClientgroupModule),
      },
      {
        path: 'BulkUpload',
        loadChildren: () =>
          import(
            'src/app/messenger/master/clientbulkupload/clientbulkupload.module'
          ).then((module) => module.ClientbulkuploadModule),
      },
      {
        path: 'Profile',
        loadChildren: () =>
          import('src/app/messenger/master/sendsms/sendsms.module').then(
            (module) => module.SendsmsModule
          ),
      },
      {
        path: 'Events',
        loadChildren: () =>
          import('src/app/messenger/master/event/event.module').then(
            (module) => module.EventModule
          ),
      },
      {
        path: 'smsplan',
        loadChildren: () =>
          import('src/app/messenger/master/smsplan/smsplan.model').then(
            (module) => module.SmsplanModel
          ),
      },
      {
        path: 'smstepmlate',
        loadChildren: () =>
          import('src/app/messenger/master/smstepmlate/smstepmlate.model').then(
            (module) => module.SmstepmlateModel
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/messenger/master/users/users.module').then(
            (module) => module.UsersModule
          ),
      },
      {
        path: 'Coach',
        loadChildren: () =>
          import('src/app/messenger/master/users/users.module').then(
            (module) => module.UsersModule
          ),
      },
      {
        path: 'Admin',
        loadChildren: () =>
          import('src/app/messenger/master/users/users.module').then(
            (module) => module.UsersModule
          ),
      },
      {
        path: 'Admin/:id',
        loadChildren: () =>
          import('src/app/messenger/master/users/users.module').then(
            (module) => module.UsersModule
          ),
      },
      {
        path: 'TeamMember',
        loadChildren: () =>
          import('src/app/messenger/master/users/users.module').then(
            (module) => module.UsersModule
          ),
      },
      {
        path: 'team-member',
        loadChildren: () =>
          import('./add-members/add-members.module').then(
            (m) => m.AddMembersModule
          ),
        pathMatch: 'full',
      },
      {
        path: 'ViewMembers',
        loadChildren: () =>
          import('./team-members/team-members.module').then(
            (m) => m.TeamMembersModule
          ),
      },
      {
        path: 'ViewMembers/:id',
        loadChildren: () =>
          import('./team-members/team-members.module').then(
            (m) => m.TeamMembersModule
          ),
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
