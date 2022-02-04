import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showHeader = false;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private zone: NgZone,
    public http: HttpClient
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url === '/auth/signin' ||
          event.url === '/auth/signup' ||
          event.url === '/auth/reset-password' ||
          event.url === '/auth/change-password'
        ) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
          // window.location.href = '';
        }
      }
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0);
    });
  }

  makeHttpCall() {
    this.http
      .get('https://jsonplaceholder.typicode.com/comments')
      .subscribe((r) => {});
  }
}
