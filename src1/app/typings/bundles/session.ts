import { ViewCarts } from 'src/app/shared/models/view-carts';
import { decrypt, encrypt } from './secure';
import { findIndex, isJson } from './common';

type ProductTypes = 'viewCartListProducts' | 'wishListProducts';

const storage = localStorage;

export class Session {
  private set viewCartListProducts(products: ViewCarts[]) {
    storage.setItem('viewCartList', encrypt(products));
  }
  private get viewCartListProducts(): ViewCarts[] {
    const viewCartList = storage.getItem('viewCartList');
    return viewCartList
      ? isJson(viewCartList)
        ? JSON.parse(viewCartList)
        : decrypt(viewCartList)
      : [];
  }

  private set wishListProducts(products: ViewCarts[]) {
    storage.setItem('wishList', encrypt(products));
  }
  private get wishListProducts(): ViewCarts[] {
    const wishList = storage.getItem('wishList');
    return wishList
      ? isJson(wishList)
        ? JSON.parse(wishList)
        : decrypt(wishList)
      : [];
  }

  public getProducts(productType: ProductTypes): ViewCarts[] {
    return this[productType];
  }

  public deleteAllProduct(productType: ProductTypes): void {
    this[productType] = [];
  }

  public getViewCartProduct(product: ViewCarts): ViewCarts {
    return;
  }

  public addViewCartProducts(product: ViewCarts): void {
    const storedProducts = this.viewCartListProducts || [];
    product.AutoId = Date.now();
    if (product.AccessoryId) {
      const existingAccessory = storedProducts.find(
        (f) => f.AccessoryId === product.AccessoryId
      );
      if (existingAccessory) {
        const index = findIndex(storedProducts, existingAccessory, ['AutoId']);
        storedProducts.splice(index, 1);
      }
    }
    this.viewCartListProducts = [...storedProducts, product];
  }

  public updateViewCartProducts(product: ViewCarts): void {
    const storedProducts = this.viewCartListProducts || [];
    const index = findIndex(storedProducts, product, ['AutoId']);
    storedProducts[index] = product;
    this.viewCartListProducts = [...storedProducts];
  }

  public deleteViewCartProducts(product: ViewCarts): void {
    const storedProducts = this.viewCartListProducts || [];
    const index = findIndex(storedProducts, product, ['AutoId']);
    storedProducts.splice(index, 1);
    this.viewCartListProducts = [...storedProducts];
  }

  public onChangeWishList(product: ViewCarts): void {
    const storedProducts = this.wishListProducts || [];
    const existingProduct = storedProducts.find(
      (f) => f.ProductCode === product.ProductCode
    );
    if (existingProduct) {
      const index = findIndex(storedProducts, existingProduct, ['AutoId']);
      storedProducts.splice(index, 1);
      this.wishListProducts = [...storedProducts];
    } else {
      this.wishListProducts = [...storedProducts, product];
    }
  }

  public isActiveWishList(ProductCode: number): boolean {
    const storedProducts = this.wishListProducts || [];
    const existingProduct = storedProducts.find(
      (f) => f.ProductCode === ProductCode
    );
    return !!existingProduct;
  }
}
