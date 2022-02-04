import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { FieldType } from 'src/app/shared/models/common-types';
import { clientsList } from 'src/app/shared/models/msg_custclients';
import { DataserviceService } from 'src/app/shared/dataservice/dataservice.service';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';

@Component({
  selector: 'app-sendsms',
  templateUrl: './sendsms.component.html',
  styleUrls: ['./sendsms.component.css'],
})
export class SendsmsComponent implements OnInit {
  customers: clientsList[];
  selectedcustomers: clientsList[];
  Groups: FieldType[];
  seletedgrps: FieldType[];
  event: FieldType[];
  Events: FieldType[];
  loading: boolean = true;

  constructor(private api: DataserviceService) {}

  ngOnInit(): void {
    this.loading = false;
    this.getdata();
  }
  getdata(): void {
    zip(
      this.api.get(Endpoint.Groups),
      this.api.get(Endpoint.Events),
      this.api.get(Endpoint.Clientslist)
    ).subscribe(([grps, evns, clnlist]) => {
      this.customers = clnlist;
      this.Groups = grps;
      this.Events = evns;
    });
  }
  Cleardata(): void {}
  SaveEdit() {}
}
