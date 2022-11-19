import {ProductSortBy} from "../utils/product-constants";
import {SortOrder} from "../../../shared/constants/shared-constants";

export interface GetProductsRequest {
  name: string;
  value: number;
  sortBy: ProductSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
}
