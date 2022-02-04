import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss'],
})
export class AuthResetPasswordComponent implements OnInit {
  userEmail = '';
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  resetPassword() {
    this.http
      .get(environment.server + Endpoint.SendMail + '/' + this.userEmail)
      .subscribe((res: string) => {
        this.message = res;
      });
  }
}
