import {DEFAULT_PAGINATION_PARAMETERS, SortOrder} from "../../../shared/constants/shared-constants";
import {Pagination} from "../../../shared/utils/models/pagination.model";
import {ProductSortBy} from "./product-constants";

export class ProductFilters {
  DEFAULT_PRODUCT_NAME = '';
  DEFAULT_PRODUCT_VALUE = null;

  private _name: string;
  private _value: number;
  private _sortBy: ProductSortBy;
  private _sortOrder: SortOrder;
  private _pagination: Pagination;

  constructor() {
    this.pagination = new Pagination(
      DEFAULT_PAGINATION_PARAMETERS.page,
      DEFAULT_PAGINATION_PARAMETERS.pageSize
    );
    this.clearFilters();
  }

  clearFilters() {
    this.sortBy = null;
    this.sortOrder = null;
    this.pagination.page = DEFAULT_PAGINATION_PARAMETERS.page;
    this.pagination.pageSize = DEFAULT_PAGINATION_PARAMETERS.pageSize;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get sortBy(): ProductSortBy {
    return this._sortBy;
  }

  set sortBy(value: ProductSortBy) {
    this._sortBy = value;
  }

  get sortOrder(): SortOrder {
    return this._sortOrder;
  }

  set sortOrder(value: SortOrder) {
    this._sortOrder = value;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  set pagination(value: Pagination) {
    this._pagination = value;
  }

  public haveFiltersBeenTouched(): boolean {
    return (
      this.name.trim() !== this.DEFAULT_PRODUCT_NAME ||
      this.value !== this.DEFAULT_PRODUCT_VALUE
    );
  }
}
