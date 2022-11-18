import {Product} from "../utils/models/product.model";

export interface getProductsResponse {
  count: number;
  rows: Product[];
}
