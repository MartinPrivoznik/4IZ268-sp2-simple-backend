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
import GetProductsPagedRequestParams from './dto/requests/GetProductsPagedRequestParams';
import { validateData } from '../utils/validators/classValidator';
import { AddProductRequest } from './dto/requests/CreateProductRequest';
import { requestValidationMiddleware } from '../middleware/requestValidationMiddleware';
import UpdateProductRequest from './dto/requests/UpdateProductRequest';

@Route('api/products')
@Tags('Products')
@Security('API_KEY')
export class ProductsController extends Controller {
  /**
   * Retrieves an array of all products included in the database
   */
  @Get()
  public async getAllProducts(): Promise<ApiResponse<IProduct[]>> {
    const products = await productsService.getAllProducts();
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
   * Retrieves a paged list of products based on page and page size.
   * @param page page to be used in output. Default value is 1
   * @param offset page size to be used in output. Default value is 10
   * @example page 1
   * @example offset 10
   */
  @Get('paged')
  public async getProductsPaged(
    @Query() page?: number,
    @Query() offset?: number
  ): Promise<ApiResponse<PagedList<IProduct>>> {
    const queryParams = new GetProductsPagedRequestParams();
    queryParams.page = page;
    queryParams.pageSize = offset;

    await validateData(queryParams, GetProductsPagedRequestParams);

    const products = await productsService.getProductsPaged(
      queryParams.page,
      queryParams.pageSize
    );
    return { success: true, data: products };
  }

  /**
   * Performs a fulltext search on the products collection based on the query parameter
   * @param query string query to be used in the search
   * @example query "prod"
   */
  @Get('search')
  public async fulltextSearchProducts(
    @Query() query?: string
  ): Promise<ApiResponse<IProduct[]>> {
    const products = await productsService.fulltextSearchProducts(query);
    return { success: true, data: products };
  }

  /**
   * Adds a new product to the database
   * @param req Request body containing the product data
   */
  @Post('add')
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
  @Put('update')
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
  @Delete('delete/{id}')
  public async deleteProduct(@Path() id: string): Promise<BaseApiResponse> {
    await productsService.deleteProduct(id);
    return { success: true, message: 'Product deleted' };
  }
}
