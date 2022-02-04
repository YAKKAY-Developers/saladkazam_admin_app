import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import { Restaurant } from "src/app/shared/models/restaurant.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "add-restaurant",
  templateUrl: "./add-restaurant.component.html",
  styleUrls: ["./add-restaurant.component.scss"],
})
export class AddRestaurantComponent implements OnInit {
  constructor(
    private route: Router,
    private http: HttpClient,
    private datascv: DataserviceService,
    private elRef: ElementRef
  ) {}

  public formData = new FormData();
  fileToUpload: any;
  imageUrl: any = "";
  ImageFile =
    "https://media.glassdoor.com/lst2x/22913/great-american-restaurants-office.jpg";
  restaurant = new Restaurant();

  ngOnInit() {}

  onFileChanged(file: FileList) {
    this.fileToUpload = file.item(0);
    this.restaurant.logo = this.fileToUpload.name;

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  redirectTo() {
    this.route.navigate(["/masters/restaurant-location"]);
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
    this.datascv
      .post(Endpoint.Restaurantmaster, this.restaurant)
      .subscribe((res) => {
        if (res.retstID) {
          this.formData.append("FileName", res.retstID.toString());
          this.datascv
            .postFile(Endpoint.FileUploader, this.formData)
            .subscribe((res) => {
              const closeModal =
                this.elRef.nativeElement.querySelector(".basic-close");
              closeModal.click();
            });
        }
      });
  }
}
