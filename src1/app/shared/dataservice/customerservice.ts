import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { msg_customer } from '../models/msg_customer';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomersSmall() {
    return this.http
      .get<any>('assets/showcase/data/customers-small.json')
      .toPromise()
      .then((res) => <msg_customer[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getCustomersMedium() {
    return this.http
      .get<any>('assets/showcase/data/customers-medium.json')
      .toPromise()
      .then((res) => <msg_customer[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getCustomersLarge() {
    return this.http
      .get<any>('assets/showcase/data/customers-large.json')
      .toPromise()
      .then((res) => <msg_customer[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getCustomersXLarge() {
    return this.http
      .get<any>('assets/showcase/data/customers-xlarge.json')
      .toPromise()
      .then((res) => <msg_customer[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getCustomers(params) {
    return this.http
      .get<any>(environment.apiUrl, { params: params })
      .toPromise();
  }
}
