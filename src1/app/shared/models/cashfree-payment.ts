// type ResponseStatus = "OK" | "ERROR";

export interface CashfreeRequest {
  appId?: string;
  secretKey?: string;
  orderId?: string;
  orderAmount?: number;
  orderCurrency?: string;
  orderNote?: string;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  returnUrl?: string;
  notifyUrl?: string;
  sellerPhone?: string;
  paymentModes?: string;
  pc?: string;
}

export interface CashfreeResponse {
  status: boolean;
  message?: string;
}
