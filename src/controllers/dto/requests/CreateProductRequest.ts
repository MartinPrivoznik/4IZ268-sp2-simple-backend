import {
  IsEmpty,
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
 * Request body for adding a new product to store.
 * @example {
 *  "name": "Product example",
 *  "price": 420.69,
 *  "stock": 8,
 *  "imagePath": "https://example.com/image.jpg",
 *  "availability": "507f191e810c19729de860ea",
 *  "condition": "507f191e810c19729de860ea"
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

  @IsUrl()
  imagePath!: string;

  @IsMongoId()
  availability!: string;

  @IsMongoId()
  condition!: string;
}
