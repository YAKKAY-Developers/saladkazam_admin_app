import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  constructor(private http: HttpClient) {}

  categoryData: any;
  tableData: any = [];
  defaultPage: number = 1;
  perPage: number = null;
  pageSize: number = 20;

  ngOnInit() {
    this.http.get("assets/categories.json").subscribe((res: any) => {
      this.categoryData = res;
      this.tableData = res.items;
      this.perPage = this.tableData.length / this.pageSize;
    });
  }

  searchData(e: any) {
    const searchKey = e.target.value;
    this.tableData = this.categoryData.items.filter((data: any) =>
      data.ingredient.toLowerCase().includes(searchKey)
    );
  }
}
