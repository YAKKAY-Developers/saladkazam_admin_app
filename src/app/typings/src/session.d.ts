

type ProductTypes = "viewCartListProducts" | "wishListProducts";

export declare class Session {
s
  /**
   * Get All Product by productType
 
  public deleteAllProduct(productType: ProductTypes): void;
  /**
   * Add new product to Cart view List
   * @param product ViewCarts
   */

  /**
   * Update product from Cart view List
   * @param product ViewCarts
   */

  /**
   * Delete product from Cart view List
   * @param product ViewCarts
   */

  public isActiveWishList(ProductCode: number): boolean;
  // /**
  //  * Add new product to Wish List
  //  * @param product ViewCarts
  //  */
  // public declare addWishListProducts(product: ViewCarts): void;
  // /**
  //  * Update product from Wish List
  //  * @param product ViewCarts
  //  */
  // public declare updateWishListProducts(product: ViewCarts): void;
  // /**
  //  * Delete product from Wish List
  //  * @param product ViewCarts
  //  */
  // public declare deleteWishListProducts(product: ViewCarts): void;
}
