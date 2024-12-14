import { IsInt, IsOptional, Max, Min } from 'class-validator';

export default class GetProductsPagedRequestParams {
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
}
