import * as productsService from '../services/productsService';
import { ApiResponse, BaseApiResponse } from './dto/ApiResponse';
import { PagedList } from '../utils/dataStructures/PagedList';
import { IProduct } from '../models/Product';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { validateData } from '../utils/validators/classValidator';
import { AddProductRequest } from './dto/requests/CreateProductRequest';
import { requestValidationMiddleware } from '../middleware/requestValidationMiddleware';
import UpdateProductRequest from './dto/requests/UpdateProductRequest';
import GetProductsQueryParams from './dto/requests/GetProductsQueryParams';

@Route('api/products')
@Tags('Products')
@Security('API_KEY')
export class ProductsController extends Controller {
  /**
   * Performs a search on all products based on the query parameters
   * @param query string query to be used in the search
   * @param page page to be used in output. Default value is 1
   * @param offset count of items per page. Default value is 10
   * @param availability availability of the product. Should correspond with the availability id
   * @param condition condition of the product. Should correspond with the condition id
   * @example query "prod"
   * @example page 1
   * @example offset 10
   */
  @Get()
  public async getProducts(
    @Query() query?: string,
    @Query() page?: number,
    @Query() offset?: number,
    @Query() availability?: string,
    @Query() condition?: string
  ): Promise<ApiResponse<PagedList<IProduct>>> {
    const queryParams = new GetProductsQueryParams();
    queryParams.query = query;
    queryParams.page = page;
    queryParams.pageSize = offset;
    queryParams.availability = availability;
    queryParams.condition = condition;

    await validateData(queryParams, GetProductsQueryParams);

    const products = await productsService.getProductsPaged(page, offset);
    return { success: true, data: products };
  }

  /**
   * Retrieves a product by its id
   * @param id id of the product to be found
   * @example id "507f191e810c19729de860ea"
   */
  @Get('{id}')
  public async getProductById(
    @Path() id: string
  ): Promise<ApiResponse<IProduct>> {
    const product = await productsService.getProductById(id);
    return { success: true, data: product };
  }

  /**
   * Adds a new product to the database
   * @param req Request body containing the product data
   */
  @Post()
  @Middlewares([requestValidationMiddleware(AddProductRequest)])
  public async addProduct(
    @Body() req: AddProductRequest
  ): Promise<ApiResponse<IProduct>> {
    const res = await productsService.addProduct(req);
    return { success: true, data: res, message: 'Product added' };
  }

  /**
   * Updates a product in the database
   * @param req Request body containing the product data
   */
  @Put()
  @Middlewares([requestValidationMiddleware(UpdateProductRequest)])
  public async updateProduct(
    @Body() req: UpdateProductRequest
  ): Promise<BaseApiResponse> {
    await productsService.updateProduct(req);
    return {
      success: true,
      message: 'Product updated',
    };
  }

  /**
   * Deletes a product from the database
   * @param id id of the product to be deleted
   * @example id "507f191e810c19729de860ea"
   */
  @Delete('{id}')
  public async deleteProduct(@Path() id: string): Promise<BaseApiResponse> {
    await productsService.deleteProduct(id);
    return { success: true, message: 'Product deleted' };
  }
}
