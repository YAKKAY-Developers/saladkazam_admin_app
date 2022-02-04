import { Component, OnInit } from '@angular/core';
import { getRouterUrls, LoginRequest } from 'src/app/typings';
import { LoginModel, labelLoginModel } from 'src/app/shared/models/login.model';
import { Loguser } from 'src/app/shared/models/loggeduser';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { DataserviceService } from 'src/app/shared/dataservice/dataservice.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/typings';
import { SidebarComponent } from 'src/app/messenger/navi/sidebar/sidebar.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export class AuthSigninComponent implements OnInit {
  public LoginModel: LoginModel = {};
  public lguser = new Loguser();
  public LoginPwd = true;
  public Loginemail = false;
  public MoblieCodeList: any[] = [];
  public Mobilecodeview = false;
  public pageCaptionControl: any = {};
  public UserName = '';
  public UserPwd = '';
  loading = false;

  constructor(
    private router: Router,
    private dataSvc: DataserviceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  onLogin() {
    this.loading = true;
    if (!this.loginValidation()) {
      this.loading = false;
      return;
    }

    // LoginRequest.data = 'sabapathy';
    this.dataSvc
      .get(Endpoint.Users + '/' + this.UserName + '/' + this.UserPwd)
      .subscribe(
        (res) => {
          this.LoginModel = res;
          LoginResponse.loginUserData = this.LoginModel;

          if (this.LoginModel == null) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Please Enter Correct User Name and password',
            });
            this.loading = false;
            return;
          }
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

          if (this.LoginModel.AccessType === 'T') {
            this.router.navigate(['master/team-member']);
          } else {
            // setTimeout(() => {
            this.router.navigate(['dashboard']);
            // }, 10000);
          }
        },
        (error) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    // this.LoginModel = null;
    //   this.getTabledata();
  }

  private getTabledata(): void {
    this.dataSvc
      .get(Endpoint.Users + '/' + this.UserName + '/' + this.UserPwd)
      .subscribe((res) => {
        this.LoginModel = res;
        LoginResponse.loginUserData = this.LoginModel;

        if (this.LoginModel == null) {
          alert('Please Enter Correct User Name and password');
          return;
        }
        Loguser.AccessType = this.LoginModel.AccessType;
        Loguser.RolliD = this.LoginModel.RolliD;
        Loguser.UserName = this.LoginModel.UserName;
        Loguser.AccessType = this.LoginModel.AccessType;
        LoginRequest.data = this.LoginModel.UserName;
        LoginRequest.AccessType = this.LoginModel.AccessType;
        LoginRequest.RolliD = this.LoginModel.RolliD.toString();

        this.router.navigate(['dashboard']);
      });
  }

  loginValidation(): boolean {
    if (!this.UserName) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please Enter User Name',
      });
      return false;
    }
    return true;
  }
}
