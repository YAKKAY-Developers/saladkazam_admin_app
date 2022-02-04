import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/typings';
import { getRouterUrls, LoginRequest } from 'src/app/typings';
import { LoginModel, labelLoginModel } from 'src/app/shared/models/login.model';
import { Router } from '@angular/router';
import { Loguser } from 'src/app/shared/models/loggeduser';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  userId: number;
  accessType = LoginRequest.AccessType;

  ngOnInit(): void {
    this.userId = LoginRequest.Userid;
  }
  onLogout() {
    LoginRequest.data = null;
    LoginResponse.loginUser = null;

    this.router.navigate(['/auth/signin']);
  }
}
