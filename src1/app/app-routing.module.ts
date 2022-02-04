import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { AuthComponent } from './Admin/auth/auth.component';
import { AuthSignupComponent } from './Admin/authentication/auth-signup/auth-signup.component';
import { AuthGuard } from './Admin/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    // component: AppComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./messenger/navi/dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
      {
        path: 'master',
        loadChildren: () =>
          import('./messenger/master/master.model').then(
            (module) => module.masterModule
          ),
      },
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./Admin/authentication/authentication.module').then(
                (module) => module.AuthenticationModule
              ),
          },
        ],
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./messenger/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      // {
      //   path: "",
      //   loadChildren: () =>
      //     import("./messenger/navi/navi.module").then(
      //       (module) => module.NaviModule
      //     ),
      // },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Admin/authentication/authentication.module').then(
            (module) => module.AuthenticationModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
