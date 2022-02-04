import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { LoginRequest, LoginResponse } from 'src/app/typings';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  onLogout()
  {
    LoginRequest.data = null;
    LoginResponse.loginUser = null;
  
    this.router.navigate(["/auth/signin"]);
    
  }
}
