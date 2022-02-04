import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { userslist } from 'src/app/shared/models/userslist';
import { environment } from 'src/environments/environment';
import { Loguser } from 'src/app/shared/models/loggeduser';
import { LoginModel } from 'src/app/shared/models/login.model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginRequest } from 'src/app/typings/bundles';
import { MessageService } from 'primeng/api';

import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs/operators';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss'],
})
export class AddMembersComponent implements OnInit {
  @ViewChild('pdfDiv') pdfDiv: ElementRef;
  @ViewChild('imageArea', { static: true }) imageArea: any;

  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
    private dialog: MatDialog,
    private messageService: MessageService,
    private captureService: NgxCaptureService
  ) {}

  teamMembers: LoginModel[] = [];
  teamCount = 0;
  totalStripes = 12;
  colors = ['gray', 'blue', 'green', 'red'];
  defaultHeight = 30;
  user: LoginModel = new LoginModel();
  users = [];
  userlists: LoginModel[] = [];
  userName =
    LoginRequest.FirstName.toUpperCase() +
    ' ' +
    LoginRequest.LastName.toUpperCase();
  nameplate = LoginRequest.FirstName + ' ' + LoginRequest.LastName.charAt(0);
  isUserExist = false;
  isSubmitted = false;
  infoUpdateTime: any;
  accessType = LoginRequest.AccessType;
  imageUrl = '';

  ngOnInit(): void {
    this.getTeamMembers(LoginRequest.Userid);
    this.http
      .get(
        environment.server +
          Endpoint.GetUserInfoUpdateTime +
          '/' +
          LoginRequest.TeamHeadID
      )
      .subscribe((res: any) => {
        this.infoUpdateTime = res;
      });
  }

  getTeamMembers(id) {
    /* get users */
    this.http
      .get(environment.server + Endpoint.GetPipeMembers + '/' + id)
      .subscribe((res: any) => {
        this.teamMembers = res;
        this.teamCount = res.length;
        if (this.teamMembers.length) {
          setTimeout(() => {
            this.addStyle();
          }, 200);
        }
      });
  }

  addMember(): any {
    if (!this.isUserExist) {
      this.teamMembers.push({
        AccessType: 'M',
        CompanyID: LoginRequest.CompanyID,
        InActive: 0,
        ModuleID: 7,
        Passwd: null,
        RolliD: null,
        TeamHeadID: LoginRequest.Userid,
        ULvl: 0,
        UserId: 0,
        UserName: 'Team Member' + (this.teamMembers.length + 1),
        AllotedCompany: LoginRequest.AllotedCompany,
      });
      setTimeout(() => {
        this.addStyle();
      }, 200);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Duplicate users found. please check and proceed',
      });
    }
  }

  addStyle(): void {
    const degreeValue: number = Math.round(360 / this.teamMembers.length);

    this.teamMembers.forEach((item, index) => {
      const element = document.querySelector(
        '.line-' + (index + 1)
      ) as HTMLElement;
      if (element) {
        element.style.top = '0';
        const line = index;
        const value = degreeValue * line;
        element.style.transform = 'rotate(' + value + 'deg)';
        element.style.borderColor = this.colors[item.ULvl];
        element.style.background = this.colors[item.ULvl];
      }

      const childelement = document.querySelector(
        '.member-' + (index + 1)
      ) as HTMLElement;
      const cancelElement = document.querySelector(
        '.cancel-' + (index + 1)
      ) as HTMLElement;

      if (childelement) {
        childelement.style.position = 'absolute';
        if (index === 0) {
          childelement.style.top = '-5px';
          childelement.style.left = '-50px';
          childelement.style.transform = 'rotate(0deg)';
          if (cancelElement) {
            cancelElement.style.right = '-20px';
          }
        } else {
          childelement.style.left = '-50px';
          childelement.style.top =
            degreeValue / 180 >= 0 ? '-3px' : degreeValue / 180 + 'px';
          const val =
            degreeValue / index <= 180
              ? '-' + degreeValue * index
              : degreeValue * index;
          childelement.style.transform = 'rotate(' + val + 'deg)';
          if (degreeValue * index > 180) {
            childelement.style.flexDirection = 'row-reverse';
          }
          if (cancelElement) {
            if (degreeValue * index > 180) {
              cancelElement.style.right = 'unset';
              cancelElement.style.left = '-20px';
            } else {
              cancelElement.style.left = 'unset';
              cancelElement.style.right = '-20px';
            }
          }
        }
        setTimeout(() => {
          childelement.style.display = 'block';
        }, 100);
      }
    });
  }

  levelChange(index: number, event: any): void {
    if (event.target.localName !== 'span') {
      return;
    }
    this.renderer.removeClass(
      event.target,
      this.colors[this.teamMembers[index].ULvl]
    );
    this.teamMembers[index].ULvl =
      this.teamMembers[index].ULvl + 1 === this.colors.length
        ? 0
        : this.teamMembers[index].ULvl + 1;
    const colorIndex = this.teamMembers[index].ULvl;
    this.renderer.addClass(event.target, this.colors[colorIndex]);
    this.save();
  }

  removeMember(): any {
    this.teamMembers.splice(this.teamMembers.length - 1, 1);
    setTimeout(() => {
      this.addStyle();
    }, 500);
  }

  deleteMember(id, userName): any {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        userName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(environment.server + Endpoint.Users + '/' + id)
          .subscribe((res) => {
            this.teamCount--;
            const index = this.teamMembers.findIndex(
              (member: LoginModel) => member.UserId === id
            );
            this.teamMembers.splice(index, 1);
            console.log(this.teamMembers);
            setTimeout(() => {
              this.addStyle();
            }, 500);
          });
      }
    });
    return;
  }

  zoomInOut(event: any) {
    const sliderValue = event.target.value;
    const element = document.querySelector('.circule-box') as HTMLElement;
    const val = Number(this.defaultHeight) + Number(sliderValue);
    element.style.height = val + 'rem';
  }

  checkUser(event: any, userId: number, i: number) {
    if (event?.relatedTarget?.className?.includes('remove')) {
      this.removeMember();
      return;
    }

    const username = event.target.value;
    /* if (userId || !username) {
      this.isUserExist = false;
      return;
    } */
    const userExist = this.teamMembers.some(
      (member, index) => member.UserName === username && index !== i
    );
    this.isUserExist = userExist;

    if (userExist) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Entered user ' + username + '  already exist. please try new',
      });
      this.isUserExist = true;
      return;
    } else {
      this.isUserExist = false;
    }

    this.http
      .get(
        environment.server +
          Endpoint.CheckPipeUser +
          '/' +
          LoginRequest.TeamHeadID +
          '/' +
          username
      )
      .subscribe((resonse: any) => {
        if (resonse && resonse.length && resonse[0].UserId !== userId) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'Entered user ' + username + ' already exist. please try new',
          });
          this.isUserExist = true;
          return;
        } else {
          this.isUserExist = false;
        }
        if (!this.isUserExist) {
          if (
            event?.relatedTarget?.className?.includes('add') ||
            event?.relatedTarget?.className?.includes('remove')
          ) {
            this.addMember();
          } else {
            this.save();
          }
        }
      });
  }

  save() {
    this.isSubmitted = true;
    // this.teamMembers.forEach((member) => {
    //   this.user.UserId = 0;
    //   this.user.companyID = Loguser.CompanyID;
    //   this.user.TeamHeadID = Loguser.UserId;
    //   this.user.UserName = member.UserName;
    //   this.user.Passwd = '';
    //   this.user.ModuleID = 7;
    //   this.user.AccessType = 'M';
    //   this.user.RolliD = 0;
    //   this.user.ULvl = member.ULvl;
    //   this.user.InActive = 0;
    //   this.userlists.push(this.user);

    // });

    const unsavedUsers = this.teamMembers.filter(
      (member) => member.UserId === 0
    );

    let duplicate = false;
    let dupuser = '';
    unsavedUsers.forEach((element, index) => {
      if (element.UserName === unsavedUsers[index + 1]?.UserName) {
        duplicate = true;
        dupuser = element.UserName;
      }
    });
    if (duplicate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Entered user ' + dupuser + ' already exist. please try new',
      });
      return;
    }

    if (!this.isUserExist) {
      this.http
        .post(environment.server + Endpoint.BulikUser, this.teamMembers)
        .subscribe((res: any) => {
          this.teamMembers = res;
          this.teamCount = res.length;
          if (this.teamMembers.length) {
            setTimeout(() => {
              this.addStyle();
            }, 200);
          }
          this.isSubmitted = false;
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Entered user already exist. please try new',
      });
    }
  }

  updatedStatus() {
    this.http
      .get(
        environment.server +
          Endpoint.SendStatusMail +
          '/' +
          LoginRequest.FirstName +
          ',' +
          LoginRequest.LastName +
          '/' +
          LoginRequest.TeamHeadID
      )
      .subscribe((res) => {
        if (res === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status successfully updated',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong, please try again later',
          });
        }
      });
  }

  download() {}

  html2image() {
    this.captureService
      .getImage(this.imageArea.nativeElement, true)
      .pipe(
        tap((img) => {
          this.imageUrl = img;
          setTimeout(() => {
            this.downloadAsPDF();
          }, 300);
        })
      )
      .subscribe();
  }

  public downloadAsPDF() {
    // const doc = new jsPDF();

    const pdfDiv = this.pdfDiv.nativeElement;

    var html = htmlToPdfmake(pdfDiv.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

  domToImage() {
    const node = document.getElementById('pipeworks');
    node.style.margin = '0';

    domtoimage
      .toPng(node)
      .then((dataUrl) => {
        node.style.margin = 'auto';
        const img = new Image();
        img.src = dataUrl;
        this.imageUrl = dataUrl;
        setTimeout(() => {
          this.downloadAsPDF();
        }, 300);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }
}
