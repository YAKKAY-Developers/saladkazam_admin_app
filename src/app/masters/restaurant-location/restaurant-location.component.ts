import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import { restaurantLocation } from "src/app/shared/models/restaurant_location.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-restaurant-location",
  templateUrl: "./restaurant-location.component.html",
  styleUrls: ["./restaurant-location.component.scss"],
})
export class RestaurantLocationComponent implements OnInit {
  serverpath: string;
  constructor(
    private http: HttpClient,
    private datascv: DataserviceService,
    private elRef: ElementRef
  ) {}

  restaurantLocationData: any;
  fileToUpload: any;
  imageUrl: any = "";
  tableData: any = [];
  defaultPage: number = 1;
  perPage: number = null;
  pageSize: number = 20;
  restaurant: string = localStorage.getItem("restaurant_name");
  restaurantId: number = Number(localStorage.getItem("restaurant_id"));
  restaurantLocation = new restaurantLocation();
  public formData = new FormData();
  isEdit = false;
  ImageFile =
    "https://media.glassdoor.com/lst2x/22913/great-american-restaurants-office.jpg";

  rest_logo = localStorage.getItem("restaurant_logo")
    ? localStorage.getItem("restaurant_logo")
    : "https://media.glassdoor.com/lst2x/22913/great-american-restaurants-office.jpg";

  viewOnly: boolean = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  deleteRestaurantData: any;
  loader = false;

  failMessage = "Something went wrong";
  successMessage = "";

  stateList = [];
  citiesList = [];

  ngOnInit() {
    this.getList();

    this.getStates();

    this.serverpath = environment.resources + "restaurant location/1/";
  }

  changeState(event: any) {
    this.restaurantLocation.StateID = Number(event.target.value);

    this.getCities(this.restaurantLocation.StateID);
  }

  private getStates() {
    this.datascv.get(Endpoint.stateLists).subscribe((res: any) => {
      this.stateList = res;
    });
  }

  private getCities(stateId: number) {
    this.datascv
      .get(Endpoint.cityLists + "/" + stateId)
      .subscribe((res: any) => {
        this.citiesList = res;
      });
  }

  private getList() {
    this.loader = true;
    this.datascv
      .get(Endpoint.RestaurantLocationList + "/" + this.restaurantId)
      .subscribe(
        (res: any) => {
          this.restaurantLocationData = res.pop();
          this.tableData = this.restaurantLocationData.List;
          this.restaurantLocation.SortNo =
            this.restaurantLocationData.List.length + 1;
          this.perPage = this.tableData.length / this.pageSize;
          this.loader = false;
        },
        (error) => {
          this.loader = false;
        }
      );
  }

  searchData(e: any) {
    const searchKey = e.target.value.toLowerCase();
    this.tableData = this.restaurantLocationData.List.filter((data: any) =>
      data.State[0].toLowerCase().includes(searchKey)
    );
  }

  onFileChanged(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    let folderName = "restaurant location";
    this.restaurantLocation.logo = fileToUpload.name;
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
  };

  SaveEdit() {
    this.restaurantLocation.CreatedBy = 1;
    this.restaurantLocation.RestType = "resturant location";
    this.restaurantLocation.UpdateBy = 1;
    this.restaurantLocation.cityID = Number(this.restaurantLocation.cityID);
    this.restaurantLocation.retstID = Number(this.restaurantId);
    this.restaurantLocation.SortNo = this.restaurantLocation.SortNo
      ? this.restaurantLocation.SortNo
      : 1;
    const active = this.restaurantLocation.Active.toString();
    this.restaurantLocation.Active = active === "false" ? 0 : 1;

    if (!this.isEdit) {
      this.datascv
        .post(Endpoint.RestaurantLocation, this.restaurantLocation)
        .subscribe((res) => {
          if (res.LocationID) {
            this.formData.append("FileName", res.LocationID.toString());
            this.submitFile(res.LocationID.toString());
          }
        });
    } else {
      this.datascv
        .put(
          Endpoint.RestaurantLocation +
            "/" +
            this.restaurantLocation.LocationID,
          this.restaurantLocation
        )
        .subscribe((res) => {
          if (res.LocationID) {
            this.formData.append("FileName", res.LocationID.toString());
            this.submitFile(res.LocationID.toString());
          }
        });
    }
  }

  submitFile(locID: string) {
    if (locID) {
      this.formData.append("FileName", locID);
      this.datascv
        .postFile(Endpoint.FileUploader, this.formData)
        .subscribe((res) => {
          const closeModal =
            this.elRef.nativeElement.querySelector(".basic-close");
          closeModal.click();
          this.isSuccess = true;
          this.successMessage = "Restaurant location successfully created";
          setTimeout(() => {
            this.isSuccess = false;
          }, 1000);
        });
    }
  }

  getData(locID: number, type?: string) {
    this.viewOnly = type === "view" ? true : false;
    this.datascv
      .get(Endpoint.RestaurantLocation + "/" + locID)
      .subscribe((res: any) => {
        this.restaurantLocation = res;
        this.isEdit = type === "view" ? false : true;
        if (this.restaurantLocation.StateID) {
          this.getCities(this.restaurantLocation.StateID);
        }
        this.imageUrl = this.serverpath + this.restaurantLocation.logo;
      });
  }

  deleteRestaurant(data: any) {
    this.datascv
      .Delete(Endpoint.RestaurantLocation + "/" + data.LocIDid)
      .subscribe(
        (res: any) => {
          this.resetData();
        },
        (error) => {
          console.log("enter");
          this.isFailed = true;
          this.failMessage = "Something went wrong";
          setTimeout(() => {
            this.isFailed = false;
          }, 5000);
        }
      );
  }

  resetData() {
    this.restaurantLocation = new restaurantLocation();
    this.isEdit = false;
    this.getList();
  }

  clearData() {
    this.restaurantLocation = new restaurantLocation();
    this.restaurantLocation.SortNo =
      this.restaurantLocationData.List.length + 1;
    this.restaurantLocation.Active = true;
  }
}
