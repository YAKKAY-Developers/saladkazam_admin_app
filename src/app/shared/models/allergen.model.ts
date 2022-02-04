export class Allergen {
  AllergenID: number = 1;
  AllergenName: string = "";
  InggroupID: number = null;
  Active: number | boolean = true;
  SortNo: number = null;
  CreatedBy: number = null;
  CreratedDate: Date = new Date();
  UpdateBy: number = null;
  UdatedDate: Date = new Date();
}

export class allergenIngredients {
  AllergenChildID: number = 0;
  AllergenID: number = null;
  IngredientID: number = null;
  Active: number = 1;
  CreatedBy: number = null;
  CreratedDate: Date = new Date();
  UpdateBy: number = null;
  UdatedDate: Date = new Date();
}
