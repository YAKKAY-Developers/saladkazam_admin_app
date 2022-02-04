import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

const server = environment.server;

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: {},
  body: {},
};

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  constructor(private httpClient: HttpClient, private modalSvc: NgbModal) {}

  public GET(endpoint: string): Observable<any> {
    httpOption.params = { showSpinner: true };
    return this.httpClient.get(server + endpoint, httpOption);
  }

  get(endpoint: string, args = {}): Observable<any> {
    httpOption.params = args;

    return this.httpClient.get(server + endpoint, httpOption).pipe(
      // map(res => this.encryptDecrptSvc.decrypt(res)),
      map((res) => res),
      retry(1),
      catchError(this.errorHandler.bind(this))
    );
  }
  post(endpoint: string, args = {}): Observable<any> {
    // let encoded = this.encryptDecrptSvc.encrypt(args);

    let encoded = args;

    let params = { encoded: encoded };
    return this.httpClient.post(server + endpoint, args, httpOption).pipe(
      map((res) => res),
      // this.encryptDecrptSvc.decrypt
      retry(1),
      catchError(this.errorHandler.bind(this))
    );
  }

  public POST(endpoint: string, params = {}): Observable<any> {
    httpOption.params = { showSpinner: true };
    return this.httpClient.post(server + endpoint, params, httpOption);
  }

  public Put(endpoint: string, params = {}): Observable<any> {
    httpOption.params = { showSpinner: true };
    return this.httpClient.put(server + endpoint, params, httpOption);
  }
  put(endpoint: string, args = {}): Observable<any> {
    let encoded = args; //this.encryptDecrptSvc.encrypt(args);
    let params = { encoded: encoded };
    return this.httpClient.put(server + endpoint, args, httpOption).pipe(
      map((res) => res),
      //this.encryptDecrptSvc.decrypt
      retry(1),
      catchError(this.errorHandler.bind(this))
    );
  }
  public Delete(endpoint: string, params = {}): Observable<any> {
    httpOption.params = { showSpinner: true };
    return this.httpClient.delete(server + endpoint, httpOption);
  }
  errorHandler(err: HttpErrorResponse) {
    // if (err.status === 401 || err.status === 403) {
    //   let options: NgbModalOptions = {
    //     backdrop: "static",
    //     keyboard: false
    //   };
    //   const modalRef = this.modalSvc.open(NgbdModalContent, options);
    //   modalRef.componentInstance.modal = err.error;
    // } else if (err.status == 400) {
    //   this.toastSvc.setToast({ ...err.error, classNames: "bg-danger" });
    // } else {
    //   this.toastSvc.setToast({
    //     header: "Error",
    //     message: "No response from server",
    //     classNames: "bg-danger"
    //   });
    // }
    // return throwError(err);
  }
}
