import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { environment } from 'src/environments/environment';
import { Loguser } from 'src/app/shared/models/loggeduser';
import { LoginRequest } from 'src/app/typings/bundles/login-data';
import { ActivatedRoute, Params } from '@angular/router';

import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs/operators';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
})
export class TeamMembersComponent implements OnInit {
  title = 'htmltopdf';

  @ViewChild('pdfDiv') pdfDiv: ElementRef;
  @ViewChild('imageArea', { static: true }) imageArea: any;

  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private captureService: NgxCaptureService
  ) {}

  teamMembers: {
    lineid: number;
    ULvl: number;
    UserName: string;
  }[] = [];
  teamCount = 0;
  totalStripes = 40;
  colors = ['gray', 'blue', 'green', 'red'];
  defaultHeight = 30;
  users = [];
  userName = '';
  nameplate = '';
  selectedUserId = '';
  accessType = LoginRequest.AccessType;
  infoUpdateTime: any;

  imageUrl = '';

  ngOnInit(): void {
    /* get users */
    this.http
      .get(
        environment.server +
          Endpoint.GetTypeusers +
          '/' +
          LoginRequest.CompanyID +
          '/T'
      )
      .subscribe((result: any) => {
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
        this.users = [...result];
        console.log(this.users);
      });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedUserId = params?.id;
      if (this.selectedUserId) {
        this.getUserPipeMembers(this.selectedUserId);
      }
    });

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

  createPipe(e: any) {
    const id = e.target.value;
    this.teamMembers = [];
    if (id === '') {
      return;
    }
    const filteredUser = this.users
      .filter((user) => user.UserId === Number(id))
      .pop();
    this.nameplate =
      filteredUser.FirstName + ' ' + filteredUser.LastName.charAt(0);
    this.userName =
      filteredUser.FirstName.toUpperCase() +
      ' ' +
      filteredUser.LastName.toUpperCase();

    this.getUserPipeMembers(id);
  }

  getUserPipeMembers(id: any) {
    /* get users */
    this.http
      .get(environment.server + Endpoint.GetPipeMembers + '/' + id)
      .subscribe((res: any) => {
        res.forEach((element, index) => {
          this.teamMembers.push({
            lineid: index + 1,
            ULvl: element.ULvl,
            UserName: element.UserName,
          });
        });
        if (this.teamMembers.length) {
          setTimeout(() => {
            this.addStyle();
          }, 200);
        }
      });
  }

  addStyle(): void {
    const degreeValue: number = 360 / this.teamMembers.length;

    this.teamMembers.forEach((item, index) => {
      const element = document.querySelector(
        '.line-' + item.lineid
      ) as HTMLElement;
      if (element) {
        element.style.top = '0';
        const line = item.lineid - 1;
        const value = degreeValue * line;
        element.style.transform = 'rotate(' + value + 'deg)';
        element.style.borderColor = this.colors[item.ULvl];
        element.style.background = this.colors[item.ULvl];
      }

      const childelement = document.querySelector(
        '.member-' + item.lineid
      ) as HTMLElement;
      if (childelement) {
        childelement.style.position = 'absolute';
        if (index === 0) {
          childelement.style.top = '-5px';
          childelement.style.left = '-50px';
          childelement.style.transform = 'rotate(0deg)';
        } else {
          childelement.style.left = '-50px';
          childelement.style.top =
            degreeValue / 180 >= 0 ? '-3px' : degreeValue / 180 + 'px';
          const val =
            degreeValue / index <= 180
              ? '-' + degreeValue * index
              : degreeValue * index;
          childelement.style.transform = 'rotate(' + val + 'deg)';
        }
        setTimeout(() => {
          childelement.style.display = 'block';
        }, 100);
      }
    });
  }

  zoomInOut(event: any) {
    const sliderValue = event.target.value;
    const element = document.querySelector('.circule-box') as HTMLElement;
    const val = Number(this.defaultHeight) + Number(sliderValue);
    element.style.height = val + 'rem';
  }

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
    this.imageUrl = '';
  }

  domToImage() {
    const node = document.getElementById('pipeworks');
    const clone = node.cloneNode(true);
    document.body.appendChild(clone);
    return;
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
