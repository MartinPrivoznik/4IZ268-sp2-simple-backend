import {
  IsMongoId,
  IsNumber,
  IsString,
  IsUrl,
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
 *  "imagePath": "https://example.com/image.jpg",
 *  "availability": "507f191e810c19729de860ea",
 *  "condition": "507f191e810c19729de860ea"
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

  @IsUrl()
  imagePath!: string;

  @IsMongoId()
  availability!: string;

  @IsMongoId()
  condition!: string;
}
