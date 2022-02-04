import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { environment } from 'src/environments/environment';
import { Company } from 'src/app/shared/models/company.model';
import { LoginModel } from 'src/app/shared/models/login.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/shared/dataservice/dataservice.service';
import { LoginRequest, LoginResponse } from 'src/app/typings';
import { Loguser } from 'src/app/shared/models/loggeduser';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export class AuthSignupComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private dataSvc: DataserviceService
  ) {}
  public LoginModel: LoginModel = {};
  companyDetails = new Company();
  userDetails = new LoginModel();
  loading = false;
  public lguser = new Loguser();

  ngOnInit() {}

  signup() {
    this.companyDetails.IsGroup = 0;
    this.loading = true;
    this.http
      .post(environment.server + Endpoint.Company, this.companyDetails)
      .subscribe(
        (res: Company) => {
          this.userDetails.CompanyID = res?.CompanyID;
          if (this.userDetails.CompanyID) {
            this.createUser();
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
  createUser() {
    this.userDetails.AccessType = 'C';
    this.userDetails.RolliD = 2;
    this.userDetails.InActive = 0;
    this.userDetails.Email = this.companyDetails.email;
    this.userDetails.FirstName = this.userDetails.UserName;
    this.userDetails.UserName = this.companyDetails.email;
    this.userDetails.LastName = this.companyDetails.CompanyName;
    this.userDetails.ModuleID = 7;
    this.userDetails.ULvl = 0;
    this.userDetails.AllotedCompany = this.userDetails.CompanyID;
    this.userDetails.CompanyID = this.userDetails.CompanyID;

    this.http
      .post(environment.server + Endpoint.Users, this.userDetails)
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User created successfully.',
        });
        this.http
          .get(
            environment.server +
              Endpoint.SendMail +
              '/' +
              this.companyDetails.email
          )
          .subscribe((response: any) => {});
        setTimeout(() => {
          this.login();
        }, 500);
      });
  }

  login() {
    this.dataSvc
      .get(
        Endpoint.Users +
          '/' +
          this.userDetails.UserName +
          '/' +
          this.userDetails.Passwd
      )
      .subscribe((res) => {
        this.LoginModel = res;
        LoginResponse.loginUserData = this.LoginModel;

        this.loading = false;
        Loguser.AccessType = this.LoginModel.AccessType;
        Loguser.RolliD = this.LoginModel.RolliD;
        Loguser.UserName = this.LoginModel.UserName;
        Loguser.AccessType = this.LoginModel.AccessType;
        LoginRequest.Userid = this.LoginModel.UserId;
        LoginRequest.data = this.LoginModel.UserName;
        LoginRequest.UserName = this.LoginModel.UserName;
        LoginRequest.AccessType = this.LoginModel.AccessType;
        LoginRequest.CompanyID = this.LoginModel.CompanyID;
        LoginRequest.AllotedCompany = this.LoginModel.AllotedCompany;
        LoginRequest.TeamHeadID = this.LoginModel.TeamHeadID;
        LoginRequest.FirstName = this.LoginModel.FirstName;
        LoginRequest.LastName = this.LoginModel.LastName;
        LoginRequest.RolliD = this.LoginModel.RolliD.toString();

        this.router.navigate(['dashboard']);
      });
  }
}
