export function encrypt(data: any): string {
  return btoa(JSON.stringify(data));
}

export function decrypt(data: string): any {
  return JSON.parse(atob(data));
}
