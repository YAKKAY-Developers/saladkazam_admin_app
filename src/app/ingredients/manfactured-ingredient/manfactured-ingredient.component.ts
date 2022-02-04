import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import {
  ingredientchilds,
  ingredientMaster,
} from "src/app/shared/models/ingredient-master.model";
import { LoginRequest } from "src/app/typings/bundles";

@Component({
  selector: "app-manfactured-ingredient",
  templateUrl: "./manfactured-ingredient.component.html",
  styleUrls: ["./manfactured-ingredient.component.scss"],
})
export class ManfacturedIngredientComponent implements OnInit {
  searchKey: string;
  constructor(
    private http: HttpClient,
    private datascv: DataserviceService,
    private elRef: ElementRef
  ) {}

  manfacturedIngredientsData: any;
  ingredientData = new ingredientMaster();
  tableData: any = [];
  defaultPage: number = 1;
  perPage: number = null;
  pageSize: number = 20;

  failMessage = "Something went wrong";
  successMessage = "";
  isEdit = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  viewOnly: boolean = false;
  deletingData: any;
  foodTypes = [];
  loader = false;

  singleSourceIngredients = [];
  selectedSourceIngredients = [];
  rejectedIngredients = [];
  ingredientChoosenList = [];
  viewIngredient: any;

  isExist = false;

  ingredients = [];

  restaurantId: number = Number(localStorage.getItem("restaurant_id"));

  ngOnInit() {
    this.getIngredients();
    this.datascv.get(Endpoint.FoodTypes).subscribe((res) => {
      this.foodTypes = res;
    });

    this.datascv.get(Endpoint.GetSingleSource).subscribe((res) => {
      this.ingredients = res;
      this.singleSourceIngredients = [];
      this.singleSourceIngredients = [
        ...this.singleSourceIngredients,
        ...this.ingredients,
      ];
    });
  }

  private getIngredients() {
    this.loader = true;
    this.datascv.get(Endpoint.FoodIngredient + "/1").subscribe(
      (res) => {
        this.manfacturedIngredientsData = res.filter(
          (data: ingredientMaster) => data.IngredientType === 3
        );
        this.tableData = [...this.manfacturedIngredientsData];
        this.ingredientData.SortNo = this.manfacturedIngredientsData.length + 1;
        this.ingredientData.IngredientType = 3;
        this.perPage = this.tableData.length / this.pageSize;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getIngredientLists(e) {
    const gropuID = e;

    this.singleSourceIngredients = this.ingredients.filter(
      (data) => data.InggroupID === Number(gropuID)
    );

    this.singleSourceIngredients.map((item) => {
      item.SortNo = 0;
    });
  }

  ingredientChoosen(e) {
    this.ingredientChoosenList = e;
  }

  searchData(e: any) {
    const searchKey = e.target.value;
    this.tableData = this.manfacturedIngredientsData.filter((data: any) =>
      data.IngredientName.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  SaveEdit() {
    this.ingredientData.CreatedBy = Number(LoginRequest.userID);
    this.ingredientData.restID = 1;
    this.ingredientData.UpdateBy = Number(LoginRequest.userID);
    this.ingredientData.IngredientType = 3;
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
      .get(Endpoint.GetIngStatus + "/1/" + this.ingredientData.IngredientName)
      .subscribe((res) => {
        if (res === "false" && !this.isEdit) {
          this.isExist = true;
          return;
        } else {
          this.isExist = false;

          if (!this.isEdit) {
            this.datascv
              .post(Endpoint.ingredientMaster, this.ingredientData)
              .subscribe({
                next: (res) => {
                  console.log("res save", res);
                  if (this.ingredientChoosenList.length) {
                    this.selectedIngredients(res.IngredientID);
                  } else {
                    this.isSuccess = true;

                    this.successMessage = "Ingredient successfully created";

                    const closeModal =
                      this.elRef.nativeElement.querySelector(".basic-close");
                    closeModal.click();

                    setTimeout(() => {
                      this.isSuccess = false;
                    }, 2000);
                  }
                },
                error: (error) => {
                  this.successMessage =
                    "Please check the Ingredient Name, Is already Exists";
                  console.error("There was an error!", error);
                },
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
                console.log("res save", res);
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
                  this.isSuccess = true;

                  this.successMessage = "Ingredient successfully updated";

                  const closeModal =
                    this.elRef.nativeElement.querySelector(".basic-close");
                  closeModal.click();
                  setTimeout(() => {
                    this.isSuccess = false;
                  }, 2000);
                }
              });
          }
        }
      });
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

        this.isSuccess = true;

        this.successMessage = this.isEdit
          ? "Ingredient successfully updated"
          : "Ingredient successfully created";

        const closeModal =
          this.elRef.nativeElement.querySelector(".basic-close");
        closeModal.click();

        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
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
    this.viewIngredient = this.manfacturedIngredientsData
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
    this.ingredientData.InggroupID = this.viewIngredient.CategoryID.toString();

    this.isEdit = type === "view" ? false : true;

    // this.getIngredientLists(this.viewIngredient.CategoryID);

    this.selectedSourceIngredients = [];

    this.viewIngredient.childs.forEach((ing) => {
      const index = this.ingredients.findIndex(
        (res) => res.IngredientID === ing.ChildID
      );
      if (index > -1) {
        this.selectedSourceIngredients.push({
          Active: this.ingredients[index].Active,
          CreatedBy: ing.CreatedBy,
          CreratedDate: ing.CreratedDate,
          InggroupID: this.ingredients[index].InggroupID,
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
    this.manfacturedIngredientsData = [];
    this.singleSourceIngredients = [];
    this.selectedSourceIngredients = [];
    this.rejectedIngredients = [];
    this.searchKey = "";
    this.viewOnly = false;
    this.isEdit = false;
    this.isExist = false;
    this.tableData = [];
    this.ngOnInit();
  }

  clearData() {
    this.ingredientData = new ingredientMaster();
    this.ingredientData.SortNo = this.manfacturedIngredientsData.length + 1;
    this.ingredientData.Active = true;
    this.selectedSourceIngredients = [];
    this.isExist = false;
  }
}
