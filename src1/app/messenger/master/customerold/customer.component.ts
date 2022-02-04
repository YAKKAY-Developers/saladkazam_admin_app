import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { msg_customer } from "src/app/shared/models/msg_customer";
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [MessageService]
})
export class CustomerComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  customerlist: any[];
  cust: msg_customer = {};

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit(): void {

  }
  Cleardata(): void { }
  SaveEdit() {


  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    let folderName = "Images";
    let FileName = fileToUpload.name;
    let custId = 1;
    alert("File Upload");
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('Folder', folderName);
    formData.append('FileName', FileName);
    formData.append('Customer',custId.toString());
    this.http.post('http://localhost:12026/api/Upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
