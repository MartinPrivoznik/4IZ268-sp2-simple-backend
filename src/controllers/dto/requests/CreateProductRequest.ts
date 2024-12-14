import {
  IsEmpty,
  IsInt,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IProduct } from '../../../models/Product';

/**
 * Request body for adding a new product to store.
 * @example {
 *  "name": "Product example",
 *  "price": 420.69,
 *  "stock": 8
 * }
 */
export class AddProductRequest implements IProduct {
  @IsEmpty()
  _id?: string;

  /**
   * Product name
   */
  @IsString()
  @MaxLength(255)
  name!: string;

  /**
   * Product price
   */
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with maximum of 2 decimal places' }
  )
  @Max(Number.MAX_VALUE)
  @Min(0)
  price!: number;

  /**
   * Product stock quantity
   */
  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(0)
  stock!: number;
}
