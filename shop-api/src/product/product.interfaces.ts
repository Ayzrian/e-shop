export interface IProductsQuery {
  name?: string;
  brand?: string;
  typeId?: string;
  limit?: number;
  offset?: number;
  price_lte?: number;
  price_gte?: number;
}
