import { IsInt, IsOptional, Max, Min } from 'class-validator';

export default class GetSearchProductsByPriceParams {
  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(0)
  @IsOptional()
  public min = 0;

  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(0)
  @IsOptional()
  public max: number = Number.MAX_SAFE_INTEGER;
}
