export class restaurantLocation {
  LocationID: number = 1;
  retstID: number = null;
  Address1: string = "";
  Address2: string = "";
  logo: string = "";
  RestType: string = "";
  Location: string = "";
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
