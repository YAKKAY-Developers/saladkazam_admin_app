import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import {
  ingredientMaster,
  ingredientchilds,
} from "src/app/shared/models/ingredient-master.model";
import { LoginRequest } from "src/app/typings";

@Component({
  selector: "app-ingredient",
  templateUrl: "./ingredient.component.html",
  styleUrls: ["./ingredient.component.scss"],
})
export class IngredientComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private datascv: DataserviceService,
    private elRef: ElementRef
  ) {}

  ingredientDataList: any;
  ingredientData = new ingredientMaster();
  tableData: any = [];
  MenuData: any = [];
  childs: ingredientchilds[] = [];
  ing = new ingredientchilds();
  defaultPage: number = 1;
  perPage: number = null;
  pageSize: number = 20;
  ingredientType = "";
  foodTypes = [];
  restaurantId: number = Number(localStorage.getItem("restaurant_id"));
  @Output() ingredientsUpdated = new EventEmitter();

  failMessage = "Something went wrong";
  successMessage = "";
  isEdit = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  viewOnly: boolean = false;
  deletingData: any;
  ingredientChoosenList: any[] = [];
  singleSourceIngredients = [];
  selectedSourceIngredients = [];
  rejectedIngredients = [];
  viewIngredient: any;
  loader = false;
  isExist = false;

  preparedIngredients = [];

  searchKey = "";

  ngOnInit() {
    this.getIngredients();

    this.datascv.get(Endpoint.FoodTypes).subscribe((res) => {
      this.foodTypes = res;
    });
  }

  private getIngredients() {
    this.loader = true;
    this.datascv.get(Endpoint.GetSingleSource).subscribe(
      (res) => {
        this.ingredientDataList = res;
        // this.tableData = res.filter((data) => data.IngredientType === 2);
        this.perPage = this.tableData.length / this.pageSize;
        this.loader = false;
        this.getIngredientLists();
      },
      (error) => {
        this.loader = false;
      }
    );

    this.datascv
      .get(Endpoint.FoodIngredient + "/" + this.restaurantId)
      .subscribe((res) => {
        this.preparedIngredients = res.filter(
          (data) => data.IngredientType === 2
        );
        this.tableData = res.filter((data) => data.IngredientType === 2);
        this.ingredientData.SortNo = this.tableData.length + 1;
        // this.ingredientDataList = res;
        // this.MenuData = this.tableData[0].List
        // this.tableData = this.MenuData;
      });
  }

  getIngredientLists(e?) {
    // const gropuID = e;

    // this.singleSourceIngredients = this.ingredientDataList.filter(
    //   (data) => data.InggroupID === Number(gropuID)
    // );

    this.singleSourceIngredients = [];
    this.singleSourceIngredients = [
      ...this.singleSourceIngredients,
      ...this.ingredientDataList,
    ];

    this.singleSourceIngredients.map((item) => {
      item.SortNo = 0;
    });
  }

  searchData(e: any) {
    const searchKey = e.target.value;
    this.tableData = this.preparedIngredients.filter((data: any) =>
      data.IngredientName.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  SaveEdit() {
    this.ingredientData.IngredientType = 2;
    this.ingredientData.CreatedBy = Number(LoginRequest.userID);
    this.ingredientData.restID = this.restaurantId;
    this.ingredientData.UpdateBy = Number(LoginRequest.userID);
    this.ingredientData.SortNo = this.ingredientData.SortNo
      ? this.ingredientData.SortNo
      : 1;
    this.ingredientData.InggroupID = Number(this.ingredientData.InggroupID);
    const active = this.ingredientData.Active.toString();
    this.ingredientData.Active = active === "false" ? 0 : 1;

    if (!this.selectedSourceIngredients.length) {
      return;
    }

    this.datascv
      .get(
        Endpoint.GetIngStatus +
          "/" +
          this.ingredientData.restID +
          "/" +
          this.ingredientData.IngredientName
      )
      .subscribe((res) => {
        if (res === "false" && !this.isEdit) {
          this.isExist = true;
          return;
        } else {
          this.isExist = false;

          if (!this.isEdit) {
            this.datascv
              .post(Endpoint.ingredientMaster, this.ingredientData)
              .subscribe((res) => {
                if (this.ingredientChoosenList.length) {
                  this.selectedIngredients(res.IngredientID);
                } else {
                  const closeModal =
                    this.elRef.nativeElement.querySelector(".basic-close");
                  closeModal.click();

                  this.successMessage = "Ingredient successfully created";

                  this.isSuccess = true;

                  setTimeout(() => {
                    this.isSuccess = false;
                  }, 2000);
                  this.ingredientsUpdated.emit(true);
                }
              });
          } else {
            this.datascv
              .put(
                Endpoint.ingredientMaster +
                  "/" +
                  this.ingredientData.IngredientID,
                this.ingredientData
              )
              .subscribe((res) => {
                this.viewIngredient.childs.forEach((ing) => {
                  const index = this.selectedSourceIngredients.findIndex(
                    (res) => res.IngredientID === ing.ChildID
                  );
                  if (index < 0) {
                    this.rejectedIngredients.push(ing);
                  }
                });
                if (this.rejectedIngredients.length) {
                  const rejectedIngredientChildData: ingredientchilds[] = [];
                  this.rejectedIngredients.forEach((element: any) => {
                    rejectedIngredientChildData.push({
                      IngredientID: element.IngredientID,
                      ChildID: element.ChildID,
                      Quatnity: 0,
                      SortNo: element.SortNo,
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
                if (this.ingredientChoosenList.length) {
                  this.selectedIngredients(res.IngredientID);
                } else {
                  const closeModal =
                    this.elRef.nativeElement.querySelector(".basic-close");
                  closeModal.click();

                  this.isSuccess = true;

                  this.successMessage = "Ingredient successfully updated";
                  // this.resetData();
                  setTimeout(() => {
                    this.isSuccess = false;
                  }, 2000);
                }
              });
          }
        }
      });
  }

  ingredientChoosen(e) {
    this.ingredientChoosenList = e;
  }

  selectedIngredients(ingId: number) {
    const ingredientChildData: ingredientchilds[] = [];
    this.ingredientChoosenList.forEach((element: any) => {
      ingredientChildData.push({
        IngredientID: ingId,
        ChildID: element.IngredientID,
        Quatnity: 0,
        SortNo: element.SortNo,
        CreatedBy: Number(LoginRequest.userID),
        CreratedDate: new Date(),
        UpdateBy: Number(LoginRequest.userID),
        UdatedDate: new Date(),
      });
    });
    this.datascv.post(Endpoint.addChildings, ingredientChildData).subscribe(
      (res) => {
        if (res !== "Saved") {
          return;
        }
        this.successMessage = this.isEdit
          ? "Ingredient successfully updated"
          : "Ingredient successfully created";

        const clearBtn = this.elRef.nativeElement.querySelector(".btn-danger");
        clearBtn.click();

        const closeModal =
          this.elRef.nativeElement.querySelector(".basic-close");
        closeModal.click();

        this.getIngredients();
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
        this.ingredientsUpdated.emit(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setIngredientType(e: any) {
    this.ingredientData.IngredientType = Number(e.target.value);
  }

  getData(id: number, type?: string) {
    this.viewOnly = type === "view" ? true : false;
    this.viewIngredient = this.tableData
      .filter((ing: ingredientMaster) => ing.IngredientID === id)
      .pop();
    this.ingredientData.IngredientID = this.viewIngredient.IngredientID;
    this.ingredientData.IngredientName = this.viewIngredient.IngredientName;
    this.ingredientData.Description = this.viewIngredient.Description;
    this.ingredientData.IngredientType = this.viewIngredient.IngredientType;
    this.ingredientData.Active = this.ingredientData.Active ? true : false;
    this.ingredientData.SortNo = this.viewIngredient.SortNo;
    const foodType: any = this.foodTypes
      .filter((food: any) => food.Desc === this.viewIngredient.CategoryName[0])
      .pop();
    this.ingredientData.InggroupID = foodType.InggroupID;
    this.isEdit = type === "view" ? false : true;

    // this.getIngredientLists(this.viewIngredient.CategoryID);

    this.selectedSourceIngredients = [];

    this.viewIngredient.childs.forEach((ing) => {
      const index = this.ingredientDataList.findIndex(
        (res) => res.IngredientID === ing.ChildID
      );
      if (index > -1) {
        this.selectedSourceIngredients.push({
          Active: this.ingredientDataList[index].Active,
          CreatedBy: ing.CreatedBy,
          CreratedDate: ing.CreratedDate,
          InggroupID: this.ingredientDataList[index].InggroupID,
          IngredientID: ing.ChildID,
          IngredientName: ing.IngName.pop(),
          SortNo: ing.SortNo,
          UdatedDate: ing.UdatedDate,
          UpdateBy: ing.UpdateBy,
        });
      }
    });
  }

  deleteIngredient(data: ingredientMaster) {
    this.datascv
      .get(Endpoint.DeleteFoodIngredient + "/" + data.IngredientID)
      .subscribe(
        (res: any) => {
          if (res === "Having Trans Entry") {
            this.isFailed = true;
            this.failMessage =
              "Please remove child data of " + data.IngredientName;
            setTimeout(() => {
              this.isFailed = false;
            }, 5000);
          } else {
            this.ingredientsUpdated.emit(true);
          }
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
    this.ingredientData = new ingredientMaster();
    this.ingredientData.Active = 1;
    this.ingredientChoosenList = [];
    this.singleSourceIngredients = [];
    this.rejectedIngredients = [];
    this.isEdit = false;
    this.viewOnly = false;
    this.isExist = false;
    this.selectedSourceIngredients = [];
    this.searchKey = "";
    this.getIngredients();
  }

  clearData() {
    this.ingredientData = new ingredientMaster();
    this.ingredientData.SortNo = this.tableData.length + 1;
    this.ingredientData.Active = true;
    this.selectedSourceIngredients = [];
    this.isExist = false;
  }
}
