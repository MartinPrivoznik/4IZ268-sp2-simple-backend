import {
  IsArray,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export default class GetProductsQueryParams {
  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(1)
  @IsOptional()
  public page?: number;

  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(0)
  @IsOptional()
  public pageSize?: number;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  public query?: string;

  @IsMongoId()
  @IsOptional()
  public availability?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  public condition?: string[];

  @IsOptional()
  @MaxLength(20)
  @IsString()
  public sort?: string;
}
