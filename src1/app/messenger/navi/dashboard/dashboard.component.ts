import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { Company } from 'src/app/shared/models/company.model';
import { environment } from 'src/environments/environment';
import { LoginRequest } from 'src/app/typings/bundles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: any[];
  teams: any[];
  constructor(private http: HttpClient) {}

  companyLists: any;
  accessType = '';
  totalCoach = 0;
  totalMembers = 0;
  totalPipeWorks = 0;

  ngOnInit(): void {
    // for company list
    this.accessType = LoginRequest.AccessType;
    this.http
      .get(
        environment.server +
          Endpoint.GetCompanies +
          '/' +
          LoginRequest.CompanyID
      )
      .subscribe((response: any) => {
        if (LoginRequest.AccessType === 'H') {
          response = response.filter(
            (coach) => coach?.CompanyID === LoginRequest?.AllotedCompany
          );
        }
        this.companyLists = response;
        this.companyLists.forEach((element) => {
          this.totalCoach = this.totalCoach + element.coachs;
        });
      });

    // for coach list
    this.http
      .get(
        environment.server +
          Endpoint.GetTypeusers +
          '/' +
          LoginRequest.CompanyID +
          '/H'
      )
      .subscribe((result: any) => {
        if (result.length) {
          if (LoginRequest.AccessType === 'H') {
            result = result.filter(
              (coach) => coach?.UserId === LoginRequest?.Userid
            );
          }
          this.users = [...result];
          this.users.forEach((element) => {
            this.totalMembers = this.totalMembers + element.TeamMembers;
          });
        }
      });
    // for team member list
    this.http
      .get(
        environment.server +
          Endpoint.GetTypeusers +
          '/' +
          LoginRequest.CompanyID +
          '/T'
      )
      .subscribe((result: any) => {
        if (result.length) {
          if (LoginRequest.AccessType === 'T') {
            result = result.filter(
              (data) => data?.UserId === LoginRequest?.Userid
            );
          } else {
            if (LoginRequest.AccessType === 'H') {
              result = result.filter(
                (data) => data?.TeamHeadID === LoginRequest?.Userid
              );
            }
          }
          this.teams = [...result];
          this.teams.forEach((element) => {
            this.totalPipeWorks = this.totalPipeWorks + element.PipeMembers;
          });
        }
      });
  }
}
