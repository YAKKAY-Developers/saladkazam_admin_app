import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';

import { Loguser } from 'src/app/shared/models/loggeduser';
import { LoginModel } from 'src/app/shared/models/login.model';
import { LoginRequest } from 'src/app/typings/bundles';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public UserDisplay = 'Super Admin';
  accessType: string;
  userDetails = new LoginModel();
  users: LoginModel[] = [];
  groups: any = [];
  userId: number;
  isActive = true;
  userType = LoginRequest.AccessType;
  loggedInUserId: number = LoginRequest.Userid;

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private element: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     switch (event.url.trim()) {
    //       case '/master/Coach':
    //         this.UserDisplay = 'Coach';
    //         this.accessType = 'H';
    //         break;
    //       case '/master/Admin':
    //         this.UserDisplay = 'Team';
    //         this.accessType = 'T';
    //         break;
    //       case '/master/TeamMember':
    //         this.UserDisplay = 'T. Member';
    //         this.accessType = 'T';
    //         break;
    //       case 'S':
    //         this.UserDisplay = 'S. Admin';
    //         this.accessType = 'S';
    //         break;
    //     }
    //   }
    // });
  }

  ngOnInit(): void {
    this.getGroups();
    // this.getLists();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = Number(params?.id);
    });

    if (this.userId) {
      this.http
        .get(environment.server + Endpoint.Users + '/' + this.userId)
        .subscribe((response: any) => {
          this.userDetails = response;
        });
    } else {
      this.userDetails.InActive = 0;
      this.isActive = this.userDetails.InActive ? false : true;
      this.userDetails.Gender = 'Male';
    }
  }

  getGroups() {
    this.http
      .get(
        environment.server +
          Endpoint.GetCompanies +
          '/' +
          LoginRequest.CompanyID
      )
      .subscribe((response: any) => {
        this.groups = response;
        if (LoginRequest.AccessType === 'H') {
          this.groups = this.groups.filter(
            (grp) => grp.CompanyID === LoginRequest.AllotedCompany
          );
        }
      });
  }

  getLists() {
    const method = this.UserDisplay === 'Coach' ? 'GetCompanycoach' : '';
    if (method) {
      this.http
        .get(
          environment.server + Endpoint[method] + '/' + LoginRequest.CompanyID
        )
        .subscribe((result: any) => {
          if (result.length) {
            this.users = [...result];
          }
        });
    }
  }

  Cleardata(): void {
    if (this.userDetails?.UserName) {
      const resetForm = this.element.nativeElement.querySelector('.reset');
      resetForm.click();
      setTimeout(() => {
        this.userDetails.InActive = 0;
        this.isActive = this.userDetails.InActive ? false : true;
        this.userDetails.Gender = 'Male';
        this.userDetails.AllotedCompany = null;
      }, 500);
    }
  }
  SaveEdit() {
    const method = this.userId ? 'put' : 'post';

    if (!this.userId) {
      this.userDetails.AccessType = this.accessType;
      this.userDetails.UserName = this.userDetails.Email;
      this.userDetails.RolliD = 2;
      this.userDetails.CompanyID = LoginRequest.CompanyID;
      this.userDetails.TeamHeadID = LoginRequest.Userid;
      this.userDetails.UserId = 0;
      this.userDetails.RolliD =
        this.accessType === 'H' ? 3 : this.accessType === 'T' ? 4 : 5;
      this.userDetails.ModuleID = 7;
      this.userDetails.ULvl = 0;
      this.userDetails.InActive = this.isActive ? 0 : 1;

      this.http
        .get(
          environment.server +
            Endpoint.CheckUser +
            '/' +
            LoginRequest.CompanyID +
            '/' +
            this.userDetails.UserName
        )
        .subscribe((resonse: any) => {
          if (resonse.length) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: this.UserDisplay + ' email already exist.',
            });
            return;
          }
        });
    }

    this.http[method](
      environment.server + Endpoint.Users,
      this.userDetails
    ).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.UserDisplay + ' created successfully.',
      });
      this.http
        .get(
          environment.server + Endpoint.SendMail + '/' + this.userDetails.Email
        )
        .subscribe((response: any) => {});
      // this.getLists();
      this.Cleardata();
      this.router.navigate(['dashboard']);
    });
  }

  checkUser() {
    this.http
      .get(
        environment.server +
          Endpoint.CheckUser +
          '/' +
          LoginRequest.CompanyID +
          '/' +
          this.userDetails.Email
      )
      .subscribe((resonse: any) => {
        if (resonse.length) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.UserDisplay + ' email already exist.',
          });
          return;
        }
      });
  }
}
