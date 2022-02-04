import { LoginModel } from "src/app/shared/models/login.model";



interface LoginResponse {
  loginUserData: LoginModel;
  loginUser: LoginModel;
  defaultAddressId: {billing?: number, shipping?: number};
  // UnknownUser: LoginModel;
}
interface LoginRequest {
  data: string;
}
export declare const LoginResponse: LoginResponse;
export declare const LoginRequest: LoginRequest;

export declare function onLogout(): void;
