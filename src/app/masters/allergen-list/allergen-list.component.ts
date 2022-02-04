import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import {
  Allergen,
  allergenIngredients,
} from "src/app/shared/models/allergen.model";
import { ingredientMaster } from "src/app/shared/models/ingredient-master.model";
import { Menu, menuIngredients } from "src/app/shared/models/menu.model";
import { LoginRequest } from "src/app/typings";

@Component({
  selector: "app-allergen-list",
  templateUrl: "./allergen-list.component.html",
  styleUrls: ["./allergen-list.component.scss"],
})
export class AllergenListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private datascv: DataserviceService,
    private elRef: ElementRef
  ) {}
  @Output() menuUpdated = new EventEmitter();

  loader = false;
  allergenItems: any;
  tableData: any = [];
  defaultPage: number = 1;
  perPage: number = null;
  pageSize: number = 20;
  restaurantId: number = Number(localStorage.getItem("restaurant_id"));
  allergenData = new Allergen();

  failMessage = "Something went wrong";
  successMessage = "";
  isEdit = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  viewOnly: boolean = false;

  ingredientChoosenList: any[] = [];
  foodCategoryList = [];
  deleteRestaurantData: any;

  restId = localStorage.getItem("restaurant_id");
  ingredientLists = [];

  selectedSourceIngredients = [];
  rejectedIngredients = [];
  viewIngredient: any;

  ingredienstRecords = [];

  isOrder = false;

  ngOnInit() {
    this.getAllergenItems();

    this.datascv.get(Endpoint.FoodTypes).subscribe((res) => {
      this.foodCategoryList = res;
    });

    // this.datascv.get(Endpoint.GetSingleSource).subscribe((res) => {
    //   this.ingredienstRecords = res;
    // });
  }

  getIngredientLists(e) {
    const gropuID = e;

    this.ingredientLists = this.ingredienstRecords.filter(
      (data) => data.InggroupID === Number(gropuID)
    );

    this.ingredientLists.map((item) => {
      item.SortNo = 0;
    });
  }

  private getAllergenItems() {
    this.loader = true;
    this.datascv.get(Endpoint.GetSingleSource).subscribe(
      (res: any) => {
        this.ingredienstRecords = res;
        this.allergenItems = res;
        this.tableData = this.allergenItems;
        this.allergenData.SortNo = this.allergenItems.length + 1;
        this.perPage = this.tableData.length / this.pageSize;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  searchData(e: any) {
    const searchKey = e.target.value;
    this.tableData = this.allergenItems.filter((data: any) =>
      data.IngredientName.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  ingredientChoosen(e) {
    this.ingredientChoosenList = e;
    console.log(e);
  }

  SaveEdit() {
    this.allergenData.UpdateBy = Number(LoginRequest.userID);
    this.allergenData.CreatedBy = Number(LoginRequest.userID);
    this.allergenData.SortNo = this.allergenData.SortNo
      ? this.allergenData.SortNo
      : 1;
    const active = this.allergenData.Active.toString();
    this.allergenData.Active = active === "false" ? 0 : 1;
    this.allergenData.InggroupID = Number(this.allergenData.InggroupID);

    if (!this.selectedSourceIngredients.length) {
      return;
    }

    if (!this.isEdit) {
      this.datascv.post(Endpoint.allergenlist, this.allergenData).subscribe(
        (res) => {
          if (res.AllergenID) {
            // this.selectedIngredients(res.AllergenID);
            if (this.ingredientChoosenList.length) {
              this.selectedIngredients(res.AllergenID);
            } else {
              const closeModal =
                this.elRef.nativeElement.querySelector(".basic-close");
              closeModal.click();

              this.getAllergenItems();

              this.isSuccess = true;
              this.successMessage = "Allergen successfully created";
              this.menuUpdated.emit(true);
              setTimeout(() => {
                this.isSuccess = false;
              }, 2000);
            }
          }
        },
        (error) => {
          console.log("enter");
          this.isFailed = true;
          setTimeout(() => {
            this.isFailed = false;
          }, 2000);
        }
      );
    } else {
      this.viewIngredient.childs.forEach((ing) => {
        const index = this.selectedSourceIngredients.findIndex(
          (res) => res.IngredientID === ing.IngredientID
        );
        if (index < 0) {
          this.rejectedIngredients.push(ing);
        }
      });
      if (this.rejectedIngredients.length) {
        const rejectedIngredientChildData: any[] = [];
        this.rejectedIngredients.forEach((element: any) => {
          rejectedIngredientChildData.push({
            AllergenChildID: element.AlergenChildID,
            AllergenID: this.allergenData.AllergenID,
            IngredientId: element.IngredientID,
            Active: 1,
            CreatedBy: Number(LoginRequest.userID),
            CreratedDate: new Date(),
            UpdateBy: Number(LoginRequest.userID),
            UdatedDate: new Date(),
          });
        });
        this.datascv
          .put(Endpoint.addChildings, this.rejectedIngredients)
          .subscribe((res) => {
            console.log(res);
          });
      }
      this.datascv
        .put(
          Endpoint.allergenlist + "/" + this.allergenData.AllergenID,
          this.allergenData
        )
        .subscribe(
          (res) => {
            if (res.AllergenID) {
              if (this.ingredientChoosenList.length) {
                this.selectedIngredients(res.AllergenID);
              } else {
                const closeModal =
                  this.elRef.nativeElement.querySelector(".basic-close");
                closeModal.click();

                this.getAllergenItems();

                this.isSuccess = true;
                this.successMessage = "Allergen successfully updated";
                this.menuUpdated.emit(true);
                setTimeout(() => {
                  this.isSuccess = false;
                }, 2000);
              }
            }
          },
          (error) => {
            this.isFailed = true;
            setTimeout(() => {
              this.isFailed = false;
            }, 2000);
          }
        );
    }
  }

  selectedIngredients(allergenID: number) {
    const ingredientData: allergenIngredients[] = [];
    this.ingredientChoosenList.forEach((element: any) => {
      let AlergenChildID = 0;
      if (this.selectedSourceIngredients.length) {
        const index = this.selectedSourceIngredients.findIndex(
          (res) => res.IngredientName === element.IngredientName
        );
        if (index > -1) {
          AlergenChildID = this.selectedSourceIngredients[index].AlergenChildID;
        }
      }

      ingredientData.push({
        AllergenChildID: AlergenChildID ? AlergenChildID : 0,
        AllergenID: allergenID,
        IngredientID: element.IngredientID,
        Active: 1,
        CreatedBy: Number(LoginRequest.userID),
        CreratedDate: new Date(),
        UpdateBy: Number(LoginRequest.userID),
        UdatedDate: new Date(),
      });
    });
    this.datascv.post(Endpoint.alergenchild, ingredientData).subscribe(
      (res) => {
        if (res !== "Saved") {
          return;
        }

        this.successMessage = this.isEdit
          ? "Allergen successfully updated"
          : "Allergen successfully created";

        const clearBtn = this.elRef.nativeElement.querySelector(".btn-danger");
        clearBtn.click();

        const closeModal =
          this.elRef.nativeElement.querySelector(".basic-close");
        closeModal.click();

        this.isSuccess = true;

        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getData(id: number, type?: string) {
    this.viewOnly = type === "view" ? true : false;
    this.viewIngredient = this.allergenItems
      .filter((ing: Allergen) => ing.AllergenID === id)
      .pop();
    console.log(this.viewIngredient);
    // this.allergenData = this.viewIngredient;
    this.isEdit = type === "view" ? false : true;

    this.getIngredientLists(this.viewIngredient.InggroupID);

    this.selectedSourceIngredients = [];

    this.viewIngredient.childs.forEach((ing) => {
      this.selectedSourceIngredients.push(ing);
    });

    this.allergenData.AllergenID = this.viewIngredient.AllergenID;
    this.allergenData.AllergenName = this.viewIngredient.AllergenName;
    this.allergenData.InggroupID = this.viewIngredient.InggroupID;
    this.allergenData.Active = this.viewIngredient.Active;
    this.allergenData.CreratedDate = this.viewIngredient.CreratedDate
      ? this.viewIngredient.CreratedDate
      : new Date();
    this.allergenData.UdatedDate = this.viewIngredient.UdatedDate
      ? this.viewIngredient.UdatedDate
      : new Date();
    console.log(this.allergenData);
  }

  deleteMenu(data: any) {
    this.datascv
      .Delete(Endpoint.allergenlist + "/" + data.AllergenID)
      .subscribe(
        (res: any) => {
          this.resetData();
        },
        (error) => {
          this.isFailed = true;
          setTimeout(() => {
            this.isFailed = false;
          }, 2000);
        }
      );
  }

  resetData() {
    const clearBtn = this.elRef.nativeElement.querySelector(".btn-danger");
    clearBtn.click();
    this.allergenData = new Allergen();
    this.rejectedIngredients = [];
    this.ingredientLists = [];
    setTimeout(() => {
      this.isEdit = false;
    }, 2000);
    this.viewOnly = false;
    this.selectedSourceIngredients = [];
    this.ngOnInit();
  }

  clearData() {
    this.allergenData = new Allergen();
    this.allergenData.SortNo = this.allergenItems.length + 1;
    this.allergenData.Active = true;
    this.selectedSourceIngredients = [];
  }

  reOrder() {
    this.tableData.sort((a, b) =>
      a.IngredientName > b.IngredientName ? 1 : -1
    );
    this.isOrder = false;
  }

  changeOrder() {
    this.isOrder = !this.isOrder;
    if (this.isOrder) {
      this.tableData.sort((a, b) => (a.Type[0] > b.Type[0] ? 1 : -1));
    } else {
      this.tableData.sort((a, b) => (a.Type[0] < b.Type[0] ? 1 : -1));
    }
  }
}
