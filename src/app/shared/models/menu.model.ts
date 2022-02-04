export class Menu {
  MenuID: number = 1;
  MenuName: string = "";
  CategoryID: number = null;
  retstID: number = null;
  Menudescription: string = "";
  Active: number | boolean = true;
  SortNo: number = null;
  CreatedBy: number = null;
  CreratedDate: Date = new Date();
  UpdateBy: number = null;
  UdatedDate: Date = new Date();
}

export class menuIngredients {
  MenuIngID: number = 1;
  MenuID: number = null;
  IngredientId: number = null;
  Active: number = 1;
  CreatedBy: number = null;
  CreratedDate: Date = new Date();
  UpdateBy: number = null;
  UdatedDate: Date = new Date();
}
