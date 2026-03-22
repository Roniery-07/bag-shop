import { ErrorBase } from './error-base';

type ErrorName =
  | 'NOT_ENOUGH_PRODUCT_STOCK_ERROR'
  | 'MAX_PRODUCT_PER_CUSTOMER_ERROR'
  | 'QUANTITY_IS_NOT_POSITIVE_INTEGER_ERROR';

export class QuantityError extends ErrorBase<ErrorName> {}
