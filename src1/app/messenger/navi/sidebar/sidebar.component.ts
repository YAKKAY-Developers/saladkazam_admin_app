import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DataserviceService } from 'src/app/shared/dataservice/dataservice.service';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { Loguser } from 'src/app/shared/models/loggeduser';
import { LoginRequest } from 'src/app/typings';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy, OnChanges {
  menulist: any[];
  loginuser = 'Pranavsoft';
  nameplate = '';
  event: any;
  curUrl = '';
  @Input() showsidebar = false;
  removeSidebar = false;
  constructor(private dataSvc: DataserviceService, private router: Router) {
    this.event = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.curUrl = event.url;
      }
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {
    this.loginuser = LoginRequest.FirstName + ' ' + LoginRequest.LastName;
    this.nameplate =
      LoginRequest.FirstName.charAt(0) + LoginRequest.LastName.charAt(0);
    this.reloadMenus();
    this.removeSidebar = LoginRequest.AccessType === 'T' ? true : false;
  }

  private getTabledata(): void {
    this.dataSvc.get(Endpoint.MenuList).subscribe((res) => {
      this.menulist = res;
      this.menulist.forEach((element) => {
        const childs = element.children;
        childs?.array.forEach((elementitem) => {});
      });
    });
    this.reloadMenus();
    return;
  }

  /**
   * reloadMenus
   */
  public reloadMenus() {
    this.menulist = [];
    if (LoginRequest.AccessType === 'S' || LoginRequest.RolliD === '1') {
      this.dataSvc.get(Endpoint.MenuList).subscribe((res) => {
        this.menulist = res;
        this.menulist.forEach((element) => {
          const childs = element.children;
          childs?.array.forEach((elementitem) => {});
        });
      });
    } else {
      this.dataSvc
        .get(Endpoint.RollMenus + LoginRequest.RolliD)
        .subscribe((res) => {
          this.menulist = res;
        });
    }
  }
  ngOnDestroy() {
    this.event.unsubscribe();
  }
}
