import {
  IsInt,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IProduct } from '../../../models/Product';

/**
 * Request body for updating product in store.
 * @example {
 *  "_id": "507f191e810c19729de860ea",
 *  "name": "Product renamed",
 *  "price": 420.69,
 *  "stock": 9
 * }
 */
export default class UpdateProductRequest implements IProduct {
  /**
   * Product id. Must be a valid MongoDB ObjectId.
   */
  @IsMongoId()
  _id!: string;

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
