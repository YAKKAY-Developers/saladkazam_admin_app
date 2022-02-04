import { LoginModel } from "src/app/shared/models/login.model";
import { decrypt, encrypt } from "./secure";
import { isJson } from "./common";

const storage = localStorage;

export const LoginRequest = {
  set data(request: string) {
    storage.setItem(`loginRequest`, encrypt(request));
  },
  get data(): string {
    const request = storage.getItem(`loginRequest`);
    return request ? decrypt(request) : null;
  },
  set RolliD(request: string) {
    storage.setItem(`loginRequest`, encrypt(request));
  },
  get RolliD(): string {
    const request = storage.getItem(`loginRequest`);
    return request ? decrypt(request) : null;
  },
  set userID(request: string) {
    storage.setItem(`userID`, encrypt(request));
  },
  get userID(): string {
    const request = storage.getItem(`userID`);
    return request ? decrypt(request) : null;
  },
  set AccessType(request: string) {
    storage.setItem(`loginRequest`, encrypt(request));
  },
  get AccessType(): string {
    const request = storage.getItem(`loginRequest`);
    return request ? decrypt(request) : null;
  },
};

export const LoginResponse = {
  loginUserData: {},
  set loginUser(user: LoginModel) {
    // this.loginUserData = user;
    storage.setItem("loginUser", encrypt(user));
  },
  get loginUser(): LoginModel {
    // return this.loginUserData;
    const data = storage.getItem("loginUser");
    return data ? (isJson(data) ? JSON.parse(data) : decrypt(data)) : {};
  },
  set defaultAddressId(address: { billing?: number; shipping?: number }) {
    storage.setItem("defaultAddress", encrypt(address));
  },
  get defaultAddressId(): { billing?: number; shipping?: number } {
    const address = storage.getItem("defaultAddress");
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
  console.log("logout");
  storage.clear();
  LoginResponse.loginUserData = {};
  location.href = "#";
  // window.location.reload();
}
