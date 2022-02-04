import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { msg_customer } from 'src/app/shared/models/msg_customer';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Company } from 'src/app/shared/models/company.model';
// import { CompanyService } from 'src/app/shared/services/company.service';
import { environment } from 'src/environments/environment';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginRequest } from 'src/app/typings/bundles';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [MessageService],
})
export class CustomerComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public uploadFinished = new EventEmitter();
  customerlist: any[];
  cust: msg_customer = {};

  company = new Company();
  companyId;
  number;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private element: ElementRef,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.companyId = params?.id;
    });

    if (this.companyId) {
      this.http
        .get(environment.server + Endpoint.Company + '/' + this.companyId)
        .subscribe((response: any) => {
          this.company = response;
        });
    }
  }

  Cleardata(): void {
    if (this.company?.CompanyName) {
      const resetForm = this.element.nativeElement.querySelector('.reset');
      resetForm.click();
    }
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.key;
    const regex = new RegExp(/[0-9]|,/);
    return regex.test(charCode);
  }

  SaveEdit() {
    const method = this.companyId ? 'put' : 'post';
    this.company.Active = this.company.Active ? 1 : 0;
    this.company.ParentID = LoginRequest.CompanyID;
    this.http[method](
      environment.server +
        Endpoint.Company +
        (this.companyId ? '/' + this.companyId : ''),
      this.company
    ).subscribe(
      (response) => {
        if (method === 'post') {
          this.company = new Company();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company created successfully ',
          });
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Company updated successfully',
          });
        }
        this.route.navigate(['dashboard']);
        this.Cleardata();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    );
  }

  uploadFile(files) {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = files[0] as File;
    const folderName = 'Images';
    const FileName = fileToUpload.name;
    const custId = 1;
    alert('File Upload');
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('Folder', folderName);
    formData.append('FileName', FileName);
    formData.append('Customer', custId.toString());
    this.http
      .post('http://localhost:12026/api/Upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.uploadFinished.emit(event.body);
        }
      });
  }
}
