import { DatePipe } from "@angular/common";
import { RouterUrls } from "src/app/shared/common-data/router-url";
import { RouterUrlsType } from "src/app/shared/models/router-urls-type";

const datePipe = new DatePipe("en-US");

export function getRouterUrls(): RouterUrlsType {
  let object = {};
  Object.keys(RouterUrls).forEach((key) => {
    object[key] = `/${RouterUrls[key]}`;
  });
  return object as RouterUrlsType;
}

export function findIndex(array: any[], data: any, fields: string[]): number {
  return array.findIndex((f) => {
    // f[field] === data[field]
    const values = fields.map((field) => f[field] === data[field]);
    return !values.includes(false);
  });
}

export function formatDate(date: Date, format = "yyyy-MM-ddTHH:mm:ss"): string {
  return datePipe.transform(date, format);
}

export function sort(array: any[], key: string, isReverse = false): any[] {
  const returnVal = array.sort((a, b) => {
    const x = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
    const y = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
  return isReverse ? returnVal.reverse() : returnVal;
}

export function isJson(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function getAssets(
  path: string,
  type?: XMLHttpRequestResponseType
): any {
  const xmlHttp = new XMLHttpRequest();
  let isSync = false;
  if (type) {
    xmlHttp.responseType = type;
    isSync = true;
  }
  xmlHttp.open("GET", `/${path}`, isSync); // false for synchronous request
  xmlHttp.send(null);
  const result =
    xmlHttp.status === 200
      ? isJson(xmlHttp.responseText)
        ? JSON.parse(xmlHttp.responseText)
        : xmlHttp.responseText
      : { Error: "Not Found", text: xmlHttp.responseText };
  return result;
}
