import { Paginator } from 'primeng/paginator';
import {DEFAULT_PAGINATION_PARAMETERS} from "../../constants/shared-constants";

export class Pagination {
  private _page: number;
  private _pageSize: number;

  constructor(page: number, pageSize: number) {
    this.page = page;
    this.pageSize = pageSize;
  }

  change(onPageChangeEvent: any): void {
    this.page = onPageChangeEvent.page + 1;
    this.pageSize = onPageChangeEvent.rows;
  }

  reset(paginator: Paginator): void {
    this.page = DEFAULT_PAGINATION_PARAMETERS.page;
    this.pageSize = DEFAULT_PAGINATION_PARAMETERS.pageSize;
    paginator.changePage(0);
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }
}
