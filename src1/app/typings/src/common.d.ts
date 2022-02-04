import { RouterUrlsType } from "src/app/shared/models/router-urls-type";

export declare function getRouterUrls(): RouterUrlsType;

export declare function findIndex(
  array: any[],
  data: any,
  fields: string[]
): number;

export declare function formatDate(
  date: Date,
 // format = "yyyy-MM-ddTHH:mm:ss",
): string;

export declare function sort(
  array: any[],
  key: string,
 // isReverse = false
): any[];

export declare function isJson(str: string): boolean;

export function getAssets(path: string, type?: XMLHttpRequestResponseType): any;
