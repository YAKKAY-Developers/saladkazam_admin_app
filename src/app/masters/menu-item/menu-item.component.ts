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
import { ingredientMaster } from "src/app/shared/models/ingredient-master.model";
import { Menu, menuIngredients } from "src/app/shared/models/menu.model";
import { LoginRequest } from "src/app/typings";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"],
})
export class MenuItemComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private datascv: DataserviceService,
    private elRef: ElementRef
  ) {}
  @Output() menuUpdated = new EventEmitter();

  loader = false;
  menuItems: any;
  tableData: any = [];
  defaultPage: number = 1;
  perPage: number = null;
  pageSize: number = 20;
  restaurantId: number = Number(localStorage.getItem("restaurant_id"));
  menuData = new Menu();

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
  ingredientAllLists = [];
  manuIngredients = [];

  selectedSourceIngredients = [];
  rejectedIngredients = [];
  viewIngredient: any;
  foodTypes = [];
  isExist = false;

  ngOnInit() {
    this.getMenuItems();

    this.datascv.get(Endpoint.FoodTypes).subscribe((res) => {
      this.foodTypes = res;
    });

    this.datascv.get(Endpoint.FoodCategories).subscribe((res) => {
      this.foodCategoryList = res;
    });

    this.getIngrediensts();
  }

  private getIngrediensts() {
    this.ingredientAllLists = [];

    this.datascv.get(Endpoint.GetSingleSource).subscribe((res) => {
      this.ingredientAllLists = res;

      this.datascv
        .get(Endpoint.FoodIngredient + "/" + this.restaurantId)
        .subscribe((res) => {
          const ingredients = res.filter((item) => item.IngredientType === 2);
          this.ingredientAllLists = [
            ...this.ingredientAllLists,
            ...ingredients,
          ];
        });

      this.datascv.get(Endpoint.FoodIngredient + "/1").subscribe((res) => {
        this.manuIngredients = res.filter((item) => item.IngredientType === 3);
        this.ingredientAllLists = [
          ...this.ingredientAllLists,
          ...this.manuIngredients,
        ];
      });
    });

    // this.ingredientLists.map((item) => {
    //   item.MenuIngID = 0;
    // });
  }

  getIngredientLists(e?) {
    const IngredientType = e;
    this.ingredientLists = [];
    if (IngredientType) {
      this.ingredientLists = this.ingredientAllLists.filter(
        (data) => data.IngredientType === Number(IngredientType)
      );

      // this.ingredientLists = [...this.ingredientLists, ...this.manuIngredients];
      this.ingredientLists.map((item) => {
        item.SortNo = 0;
      });
    } else {
      this.ingredientLists = [];
    }
  }

  private getMenuItems() {
    this.loader = true;
    this.datascv.get(Endpoint.menuLists + "/" + this.restaurantId).subscribe(
      (res: any) => {
        this.menuItems = res.pop();
        if (this.menuItems) {
          this.tableData = this.menuItems.List;
          this.menuData.SortNo = this.menuItems.List.length + 1;
          this.perPage = this.tableData.length / this.pageSize;
        }
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  searchData(e: any) {
    const searchKey = e.target.value;
    this.tableData = this.menuItems.List.filter((data: any) =>
      data.MenuName.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  ingredientChoosen(e) {
    this.ingredientChoosenList = e;
  }

  SaveEdit() {
    this.menuData.retstID = Number(this.restId);
    this.menuData.CategoryID = Number(this.menuData.CategoryID);
    this.menuData.UpdateBy = Number(LoginRequest.userID);
    this.menuData.CreatedBy = Number(LoginRequest.userID);
    this.menuData.SortNo = this.menuData.SortNo ? this.menuData.SortNo : 1;
    const active = this.menuData.Active.toString();
    this.menuData.Active = active === "false" ? 0 : 1;

    if (!this.selectedSourceIngredients.length) {
      return;
    }

    this.datascv
      .get(
        Endpoint.GetMenuStatus +
          "/" +
          this.menuData.retstID +
          "/" +
          this.menuData.MenuName
      )
      .subscribe((res) => {
        if (res === "false" && !this.isEdit) {
          this.isExist = true;
          return;
        } else {
          this.isExist = false;

          if (!this.isEdit) {
            this.datascv.post(Endpoint.menu, this.menuData).subscribe(
              (res) => {
                if (res.MenuID) {
                  // this.selectedIngredients(res.MenuID);
                  if (this.ingredientChoosenList.length) {
                    this.selectedIngredients(res.MenuID);
                  } else {
                    const closeModal =
                      this.elRef.nativeElement.querySelector(".basic-close");
                    closeModal.click();
                    this.isSuccess = true;
                    this.successMessage = "Menu successfully created";
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
                }, 3000);
              }
            );
          } else {
            this.viewIngredient.Menudescription.forEach((ing) => {
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
                  MenuIngID: element.MenuIngID,
                  MenuID: this.menuData.MenuID,
                  IngredientId: element.IngredientID,
                  Active: 1,
                  CreatedBy: Number(LoginRequest.userID),
                  CreratedDate: new Date(),
                  UpdateBy: Number(LoginRequest.userID),
                  UdatedDate: new Date(),
                });
              });

              this.datascv
                .put(Endpoint.addupdatemenuChilds, this.rejectedIngredients)
                .subscribe((res) => {});
            }
            this.datascv
              .put(Endpoint.menu + "/" + this.menuData.MenuID, this.menuData)
              .subscribe(
                (res) => {
                  if (res.MenuID) {
                    if (this.ingredientChoosenList.length) {
                      this.selectedIngredients(res.MenuID);
                    } else {
                      const closeModal =
                        this.elRef.nativeElement.querySelector(".basic-close");
                      closeModal.click();
                      this.isSuccess = true;
                      this.successMessage = "Menu successfully updated";
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
                  }, 3000);
                }
              );
          }
        }
      });
  }

  selectedIngredients(menuId: number) {
    const ingredientData: menuIngredients[] = [];
    this.ingredientChoosenList.forEach((element: any) => {
      let MenuIngID = 0;
      if (this.selectedSourceIngredients.length) {
        const index = this.selectedSourceIngredients.findIndex(
          (res) => res.IngredientName === element.IngredientName
        );
        if (index > -1) {
          MenuIngID = this.selectedSourceIngredients[index].MenuIngID;
        }
      }

      ingredientData.push({
        MenuIngID: MenuIngID ? MenuIngID : 0,
        MenuID: menuId,
        IngredientId: element.IngredientID,
        Active: 1,
        CreatedBy: Number(LoginRequest.userID),
        CreratedDate: new Date(),
        UpdateBy: Number(LoginRequest.userID),
        UdatedDate: new Date(),
      });
    });

    this.datascv.post(Endpoint.addupdatemenuChilds, ingredientData).subscribe(
      (res) => {
        if (res !== "Saved") {
          return;
        }

        this.successMessage = this.isEdit
          ? "Menu successfully updated"
          : "Menu successfully created";

        const closeModal =
          this.elRef.nativeElement.querySelector(".basic-close");
        closeModal.click();

        this.isSuccess = true;

        setTimeout(() => {
          this.isSuccess = false;
        }, 5000);
        this.menuUpdated.emit(true);
      },
      (error) => {}
    );
  }

  getData(id: number, type?: string) {
    this.viewOnly = type === "view" ? true : false;
    this.viewIngredient = this.menuItems.List.filter(
      (ing: Menu) => ing.MenuID === id
    ).pop();

    this.isEdit = type === "view" ? false : true;

    this.selectedSourceIngredients = [];

    this.viewIngredient.Menudescription.forEach((ing) => {
      this.selectedSourceIngredients.push(ing);
    });

    this.menuData.MenuID = this.viewIngredient.MenuID;
    this.menuData.MenuName = this.viewIngredient.MenuName;
    this.menuData.CategoryID = this.viewIngredient.ca;
    this.menuData.retstID = this.viewIngredient.restID;
    this.menuData.Menudescription = this.viewIngredient.des;
    this.menuData.Active = this.viewIngredient.Active;
    this.menuData.CreatedBy = this.viewIngredient.CreatedBy;
    this.menuData.CreratedDate = this.viewIngredient.CreratedDate;
    this.menuData.UpdateBy = this.viewIngredient.UpdateBy;
    this.menuData.UdatedDate = this.viewIngredient.UdatedDate;

    // this.menuData.Menudescription = this.viewIngredient.des;
  }

  deleteMenu(data: any) {
    this.datascv.get(Endpoint.DeleteItem + "/" + data.MenuID).subscribe(
      (res: any) => {
        if (res === "Having Trans Entry") {
          this.isFailed = true;
          this.failMessage = "Please remove child data of " + data.MenuName;
          setTimeout(() => {
            this.isFailed = false;
          }, 5000);
        } else {
          this.menuUpdated.emit(true);
        }
        this.resetData();
      },
      (error) => {
        this.isFailed = true;
        setTimeout(() => {
          this.isFailed = false;
        }, 5000);
      }
    );
  }

  resetData() {
    const clearBtn = this.elRef.nativeElement.querySelector(".btn-danger");
    clearBtn.click();
    this.menuData = new Menu();
    this.ingredientLists = [];
    this.rejectedIngredients = [];
    this.selectedSourceIngredients = [];
    this.isEdit = false;
    this.viewOnly = false;
    this.isExist = false;
    this.getMenuItems();
    this.getIngrediensts();
  }

  clearData() {
    this.menuData = new Menu();
    this.menuData.SortNo = this.menuItems.List.length + 1;
    this.menuData.Active = true;
    this.selectedSourceIngredients = [];
    this.isExist = false;
  }
}
