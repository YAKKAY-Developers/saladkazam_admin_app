export class ingredientMaster {
  IngredientID: number = 1;
  restID: number = null;
  IngredientName: string = "";
  Description: string = "";
  IngredientType: number = null;
  InggroupID: number = null;
  Active: number | boolean = true;
  CreatedBy: number = null;
  CreratedDate: Date = new Date();
  UpdateBy: number = null;
  UdatedDate: Date = new Date();
  SortNo: number = null;
}

export class ingredientMastertopost {
  IngredientID: number = 1;
  restID: number = null;
  IngredientName: string = "";
  Description: string = "";
  IngredientType: number = null;
  InggroupID: number = null;
  Active: number = 1;
  CreatedBy: number = null;
  CreratedDate: Date = new Date();
  UpdateBy: number = null;
  UdatedDate: Date = new Date();
  SortNo: number = null;
}
export class ingredientchilds {
  SortNo: number = 0;
  IngredientID: number = 1;
  ChildID: number = 1;
  Quatnity: number = 1;
  CreatedBy: number = 1;
  CreratedDate: Date = new Date();
  UpdateBy: number = 1;
  UdatedDate: Date = new Date();
}
