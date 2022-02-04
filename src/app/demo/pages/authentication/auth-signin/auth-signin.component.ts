import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import { Loguser } from "src/app/shared/models/loggeduser";
import { LoginModel } from "src/app/shared/models/login.model";
import { LoginRequest } from "src/app/typings";

@Component({
  selector: "app-auth-signin",
  templateUrl: "./auth-signin.component.html",
  styleUrls: ["./auth-signin.component.scss"],
})
export class AuthSigninComponent implements OnInit {
  public LoginModel: LoginModel = {};
  public lguser = new Loguser();
  public LoginPwd = true;
  public Loginemail = false;
  public MoblieCodeList: any[] = [];
  public Mobilecodeview = false;
  public pageCaptionControl: any = {};
  public UserName = "";
  public UserPwd = "";
  loading = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  constructor(private router: Router, private dataSvc: DataserviceService) {}

  ngOnInit() {}
  onLogin() {
    this.loading = true;
    // if (!this.loginValidation()) {
    //   this.loading = false;
    //   return;
    // }

    LoginRequest.data = "Saba";
    // this.router.navigate(['dashboard']);
    // return;
    LoginRequest.data = "sabapathy";

    this.dataSvc
      .get(Endpoint.Users + "/" + this.UserName + "/" + this.UserPwd)
      .subscribe((res) => {
        console.log(res);
        this.loading = false;
        this.isSuccess = true;
        //     this.LoginModel = res;
        //     LoginResponse.loginUserData = this.LoginModel;

        //     if (this.LoginModel == null) {
        //       // this.messageService.add({
        //       //   severity: 'error',
        //       //   summary: 'Error',
        //       //   detail: 'Please Enter Correct User Name and password',
        //       // });
        //       return;
        //     }
        // alert("in Login");
        // Loguser.AccessType = "A";
        // Loguser.RolliD = 1;
        // Loguser.UserName = "Saba";
        // Loguser.AccessType = "A";
        // LoginRequest.data = "Saba";
        // LoginRequest.AccessType = "A";
        // LoginRequest.RolliD = "1";
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: 'Successfully logged-in',
        console.log(res.UserId);
        LoginRequest.userID = res.UserId;
        this.router.navigate(["dashboard/analytics"]);
      });
  }
  // this.LoginModel = null;
  //   this.getTabledata();
}
