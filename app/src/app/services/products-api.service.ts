import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {IProduct, IProductType} from '../interfaces/products.interfaces';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService extends ApiService {
  createProductType(data: IProductType) {
    return this.http.post(this.url('/products/types'), data).toPromise();
  }

  getProductTypes(): Promise<IProductType[]> {
    return this.http
      .get<IProductType[]>(this.url('/products/types'))
      .toPromise();
  }

  createProduct(product: IProduct) {
    return this.http.post(this.url('/products'), product).toPromise();
  }

  getProducts(query: any): Promise<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.url('/products'), {
        params: new HttpParams({
          fromObject: query,
        }),
      })
      .toPromise();
  }

  uploadProductImage(image: File) {
    const data = new FormData();
    data.append('image', image, image.name);

    return this.http
      .post<{
        imagePath: string;
      }>(this.url('/products/images'), data)
      .toPromise();
  }

  getProductById(id: number): Promise<IProduct> {
    return this.http.get<IProduct>(this.url(`/products/${id}`)).toPromise();
  }
}
