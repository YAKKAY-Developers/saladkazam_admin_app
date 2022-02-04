import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import { Restaurant } from "src/app/shared/models/restaurant.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
})
export class RestaurantComponent implements OnInit {
  @ViewChild("addRestaurantModal", { static: false })
  addRestauarantModal: ElementRef<HTMLElement>;
  serverpath: string;

  constructor(
    private http: HttpClient,
    private route: Router,
    private datascv: DataserviceService,
    private elRef: ElementRef
  ) {}

  ImageFile =
    "https://media.glassdoor.com/lst2x/22913/great-american-restaurants-office.jpg";

  restarentsData: any;
  tableData: any = [];
  defaultPage: number = 1;
  perPage: number = null;
  pageSize: number = 20;
  public formData = new FormData();
  fileToUpload: any;
  imageUrl: any = "";
  restaurant = new Restaurant();
  isEdit = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  viewOnly: boolean = false;
  failMessage = "Something went wrong";
  successMessage = "";
  deleteRestaurantData: any;

  loader = false;
  isExist = false;

  ngOnInit() {
    this.getList();
    this.serverpath = environment.resources + "logo/1/";
  }

  private getList() {
    this.loader = true;
    this.datascv.get(Endpoint.RestaurantList).subscribe(
      (res: any) => {
        this.restarentsData = res.pop();
        this.tableData = this.restarentsData.List;
        this.restaurant.SortNo = this.restarentsData.List.length + 1;
        this.perPage = this.tableData.length / this.pageSize;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  redirectTo(data: any) {
    localStorage.setItem("restaurant_name", data.Name);
    localStorage.setItem("restaurant_id", data.retstID);
    localStorage.setItem("restaurant_logo", this.serverpath + data.logo);
    this.route.navigate(["/masters/restaurant-location"]);
  }

  redirectToLoc(data: any) {
    localStorage.setItem("restaurant_name", data.restaurant);
    localStorage.setItem("restaurant_id", data.id);
    localStorage.setItem("restaurant_logo", this.serverpath + data.logo);
    this.route.navigate(["/masters/restaurant-location"]);
  }

  searchData(e: any) {
    const searchKey = e.target.value;
    this.tableData = this.restarentsData.List.filter((data: any) =>
      data.restaurant.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    let folderName = "logo";
    this.restaurant.logo = fileToUpload.name;
    this.formData = new FormData();
    let custId = 1;
    var reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = (event: any) => {
      this.ImageFile = reader.result as string;
      this.imageUrl = event.target.result;
    };
    this.formData.append("file", fileToUpload, fileToUpload.name);
    this.formData.append("Folder", folderName);
    this.formData.append("Customer", custId.toString());
  };

  SaveEdit() {
    this.restaurant.BusinessID = 1;
    this.restaurant.CreatedBy = 1;
    this.restaurant.RestType = "resturant";
    this.restaurant.StateID = 1;
    this.restaurant.UpdateBy = 1;
    this.restaurant.cityID = 1;
    this.restaurant.zip = "0";
    this.restaurant.SortNo = this.restaurant.SortNo
      ? this.restaurant.SortNo
      : 1;
    const active = this.restaurant.Active.toString();
    this.restaurant.Active = active === "false" ? 0 : 1;

    if (!this.imageUrl) {
      return;
    }

    this.datascv
      .get(Endpoint.GetRestStatus + "/" + this.restaurant.Name)
      .subscribe((res) => {
        if (res === "false" && !this.isEdit) {
          this.isExist = true;
          return;
        } else {
          this.isExist = false;
          if (!this.isEdit) {
            this.datascv
              .post(Endpoint.Restaurantmaster, this.restaurant)
              .subscribe(
                (res) => {
                  this.restaurant.retstID = res.retstID;
                  if (res.retstID && this.formData.get("file") !== null) {
                    this.submitFile(res);
                  } else {
                    const closeModal =
                      this.elRef.nativeElement.querySelector(".basic-close");
                    closeModal.click();

                    this.isSuccess = true;
                    this.successMessage = "Restaurant successfully created";
                    setTimeout(() => {
                      this.isSuccess = false;
                      this.redirectTo(res);
                    }, 1000);
                  }
                },
                (error) => {
                  this.isFailed = true;
                }
              );
          } else {
            this.datascv
              .put(
                Endpoint.Restaurantmaster + "/" + this.restaurant.retstID,
                this.restaurant
              )
              .subscribe(
                (res) => {
                  this.restaurant.retstID = res.retstID;
                  if (res.retstID && this.formData.get("file") !== null) {
                    this.submitFile(res);
                  } else {
                    const closeModal =
                      this.elRef.nativeElement.querySelector(".basic-close");
                    closeModal.click();

                    this.successMessage = "Restaurant successfully updated";
                    setTimeout(() => {
                      this.isSuccess = false;
                      this.redirectTo(res);
                    }, 1000);
                  }
                },
                (error) => {
                  this.isFailed = true;
                }
              );
          }
        }
      });
  }

  submitFile(restaurant: any) {
    if (restaurant.retstID) {
      this.formData.append("FileName", restaurant.retstID.toString());
      this.datascv.postFile(Endpoint.FileUploader, this.formData).subscribe(
        (res) => {
          const closeModal =
            this.elRef.nativeElement.querySelector(".basic-close");
          closeModal.click();
          this.isSuccess = true;
          this.successMessage = "Restaurant successfully created";
          setTimeout(() => {
            this.isSuccess = false;
            this.redirectTo(restaurant);
          }, 1000);
        },
        (error) => {
          this.isFailed = true;
          setTimeout(() => {
            this.isFailed = false;
          }, 3000);
        }
      );
    }
  }

  getData(restID: number, type?: string) {
    this.viewOnly = type === "view" ? true : false;
    this.datascv
      .get(Endpoint.Restaurantmaster + "/" + restID)
      .subscribe((res: any) => {
        this.restaurant = res;
        this.isEdit = type === "view" ? false : true;
        this.imageUrl = this.serverpath + this.restaurant.logo;
      });
  }

  deleteRestaurant(data: any) {
    this.datascv.Delete(Endpoint.Restaurantmaster + "/" + data.id).subscribe(
      (res: any) => {
        this.resetData();
      },
      (error) => {
        console.log("enter");
        this.isFailed = true;
        this.failMessage =
          "Please remove child data of restaurant of " + data.restaurant;
        setTimeout(() => {
          this.isFailed = false;
        }, 5000);
      }
    );
  }

  resetData() {
    const clearBtn = this.elRef.nativeElement.querySelector(".btn-danger");
    clearBtn.click();
    this.restaurant = new Restaurant();
    this.isEdit = false;
    this.isExist = false;
    this.imageUrl = "";
    this.getList();
  }

  clearData() {
    const clearBtn = this.elRef.nativeElement.querySelector(".btn-danger");
    clearBtn.click();
    this.restaurant = new Restaurant();
    this.restaurant.Active = true;
    this.restaurant.SortNo = this.restarentsData.List.length + 1;
    this.isExist = false;
    this.imageUrl = "";
  }
}
