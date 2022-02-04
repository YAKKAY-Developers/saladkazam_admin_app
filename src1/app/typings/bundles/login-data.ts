import { LoginModel } from 'src/app/shared/models/login.model';
import { decrypt, encrypt } from './secure';
import { isJson } from './common';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';

const storage = localStorage;

export const LoginRequest = {
  set data(request: string) {
    storage.setItem(`data`, encrypt(request));
  },
  set UserName(request: string) {
    storage.setItem(`UserName`, encrypt(request));
  },
  get data(): string {
    const request = storage.getItem(`data`);
    return request ? decrypt(request) : null;
  },
  set Userid(request: number) {
    storage.setItem(`Userid`, encrypt(request));
  },
  get Userid(): number {
    const request = storage.getItem(`Userid`);
    return request ? decrypt(request) : null;
  },
  set RolliD(request: string) {
    storage.setItem(`RolliD`, encrypt(request));
  },
  get RolliD(): string {
    const request = storage.getItem(`RolliD`);
    return request ? decrypt(request) : null;
  },
  set AccessType(request: string) {
    storage.setItem(`AccessType`, encrypt(request));
  },
  get AccessType(): string {
    const request = storage.getItem(`AccessType`);
    return request ? decrypt(request) : null;
  },
  get UserName(): string {
    const request = storage.getItem(`UserName`);
    return request ? decrypt(request) : null;
  },
  set CompanyID(request: number) {
    storage.setItem(`CompanyID`, encrypt(request));
  },
  get CompanyID(): number {
    const request = storage.getItem(`CompanyID`);
    return request ? decrypt(request) : null;
  },
  set AllotedCompany(request: number) {
    storage.setItem(`AllotedCompany`, encrypt(request));
  },
  get AllotedCompany(): number {
    const request = storage.getItem(`AllotedCompany`);
    return request ? decrypt(request) : null;
  },
  set TeamHeadID(request: number) {
    storage.setItem(`TeamHeadID`, encrypt(request));
  },
  get TeamHeadID(): number {
    const request = storage.getItem(`TeamHeadID`);
    return request ? decrypt(request) : null;
  },
  set FirstName(request: string) {
    storage.setItem(`FirstName`, encrypt(request));
  },
  get FirstName(): string {
    const request = storage.getItem(`FirstName`);
    return request ? decrypt(request) : null;
  },
  set LastName(request: string) {
    storage.setItem(`LastName`, encrypt(request));
  },
  get LastName(): string {
    const request = storage.getItem(`LastName`);
    return request ? decrypt(request) : null;
  },
};

export const LoginResponse = {
  loginUserData: {},
  set loginUser(user: LoginModel) {
    // this.loginUserData = user;
    storage.setItem('loginUser', encrypt(user));
  },
  get loginUser(): LoginModel {
    // return this.loginUserData;
    const data = storage.getItem('loginUser');
    return data ? (isJson(data) ? JSON.parse(data) : decrypt(data)) : {};
  },
  set defaultAddressId(address: { billing?: number; shipping?: number }) {
    storage.setItem('defaultAddress', encrypt(address));
  },
  get defaultAddressId(): { billing?: number; shipping?: number } {
    const address = storage.getItem('defaultAddress');
    return address ? decrypt(address) : {};
  },
  // set UnknownUser(user: LoginModel) {
  //   storage.setItem("loginUser", encrypt(user));
  // },
  // get UnknownUser(): LoginModel {
  //   const data = storage.getItem("loginUser");
  //   return data ? decrypt(data) : {};
  // },
};

export function onLogout(): void {
  storage.clear();
  LoginResponse.loginUserData = {};
  location.href = '#';
  // window.location.reload();
}
