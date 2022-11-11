export interface BreadcrumbItem {
  label: string,
  route: string
}

export interface BreadcrumbItemList extends  Array<BreadcrumbItem>{}
