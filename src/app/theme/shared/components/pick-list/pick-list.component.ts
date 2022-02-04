import { HttpClient } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "pick-list",
  templateUrl: "./pick-list.component.html",
  styleUrls: ["./pick-list.component.scss"],
})
export class PickListComponent implements OnInit, OnChanges {
  constructor(private http: HttpClient) {}

  selectListBox1: any = [];
  selectListBox2: any = [];

  listBox1: any = [];
  listBox2: any = [];

  selectedFromBox1: any = [];
  selectedFromBox2: any = [];

  @Input("ingredientLists") ingredientLists: any = [];
  @Input("selectedIngredientLists") selectedIngredientLists: any = [];
  @Output() selectedIngredients = new EventEmitter();

  ngOnInit() {}

  ngOnChanges(): void {
    this.listBox1 = [];
    this.listBox2 = [];
    this.selectListBox1 = [];
    this.selectListBox2 = [];
    this.checkSelectedIng();
  }

  checkSelectedIng() {
    if (this.selectedIngredientLists.length) {
      this.selectedIngredientLists.forEach((item) => {
        const index = this.ingredientLists.findIndex(
          (ing) => ing.IngredientID === item.IngredientID
        );
        if (index > -1) {
          this.ingredientLists.splice(index, 1);
        }
      });
    }
    this.selectListBox2 = this.selectedIngredientLists;

    this.listBox2 = this.selectedIngredientLists;

    this.selectListBox1 = [...this.ingredientLists];

    this.listBox1 = [...this.ingredientLists];
  }

  searchData(e: any, searchBy: string) {
    const searchKey = e.target.value;
    if (searchKey) {
      if (searchBy === "box1") {
        this.selectListBox1 = this.listBox1.filter((data: any) =>
          data.IngredientName.toLowerCase().includes(searchKey.toLowerCase())
        );
      } else {
        this.selectListBox2 = this.listBox2.filter((data: any) =>
          data.IngredientName.toLowerCase().includes(searchKey.toLowerCase())
        );
      }
    } else {
      searchBy === "box1"
        ? (this.selectListBox1 = this.listBox1)
        : (this.selectListBox2 = this.listBox2);
    }
  }

  moveToSelected() {
    this.selectedFromBox1.forEach((id) => {
      const index = this.selectListBox1.findIndex(
        (item) => item.IngredientID === Number(id)
      );

      if (index > -1) {
        this.selectListBox2.push(this.selectListBox1[index]);
        this.selectListBox1.splice(index, 1);
        this.listBox1.splice(index, 1);
        this.selectedIngredients.emit(this.listBox2);
      }

      const indexBox = this.listBox1.findIndex(
        (item) => item.IngredientID === Number(id)
      );

      if (index > -1) {
        this.listBox1.splice(indexBox, 1);
      }
    });

    this.selectedFromBox1 = [];
  }

  removeFromSelected() {
    this.selectedFromBox2.forEach((id) => {
      const index = this.selectListBox2.findIndex(
        (item) => item.IngredientID === Number(id)
      );
      if (index > -1) {
        this.selectListBox1.push(this.selectListBox2[index]);
        this.listBox1.push(this.selectListBox2[index]);
        this.selectListBox2.splice(index, 1);
        this.selectedIngredients.emit(this.selectListBox2);
      }
    });

    this.selectedFromBox2 = [];
  }
}
