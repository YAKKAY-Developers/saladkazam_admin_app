export class Restaurant {
  retstID: number = 1;
  Name: string = "";
  Address1: string = "";
  Address2: string = "";
  logo: string = "";
  BusinessID: number = 1;
  RestType: string = "";
  cityID: number = null;
  StateID: number = null;
  zip: string = "";
  Active: number | boolean = true;
  SortNo: number = null;
  CreatedBy: number = null;
  CreratedDate: Date = new Date();
  UpdateBy: number = null;
  UdatedDate: Date = new Date();
}
