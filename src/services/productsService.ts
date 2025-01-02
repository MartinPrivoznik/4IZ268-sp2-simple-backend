import { defaultPageSize } from './constants/productConstants';
import { PagedList } from '../utils/dataStructures/PagedList';
import Product, { IProduct } from '../models/Product';
import NotFoundError from '../utils/exceptions/NotFoundError';
import { validateObjectId } from '../utils/validators/mongoValidator';
import GetProductsQueryParams from '../controllers/dto/requests/GetProductsQueryParams';

/**
 * Returns an array of all products included in the database
 * @returns Array of all products
 */
export const getAllProducts = async (): Promise<IProduct[]> => {
  return Product.find().exec();
};

/**
 * Returns a single product by its id
 * @param id id of the product to be returned
 * @returns Found product
 */
export const getProductById = async (id: string): Promise<IProduct> => {
  validateObjectId(id);
  return Product.findById(id).exec() as Promise<IProduct>;
};

/**
 * Returns a paged list of products based on page and page size. See {@link PagedList} for more details.
 * @param page page to be used in output. Default value is 1
 * @param pageSize count of items per page. Default value is 10
 * @param query query to be used in the search
 * @param availability availability of the product. Should correspond with the availability id
 * @param conditions conditions of the product. Should correspond with the condition id
 * @returns Paginated list of products
 */
export const getProductsPaged = async (
  params: GetProductsQueryParams
): Promise<PagedList<IProduct>> => {
  const p = params.page || 1;
  const size = params.pageSize || defaultPageSize;
  const offset = (p - 1) * size;

  const queryRegex = new RegExp(params.query ?? '', 'i');

  const filter: Record<string, unknown> = {
    name: { $regex: queryRegex },
  };

  if (params.availability) {
    filter.availability = params.availability;
  }

  if (
    params.condition &&
    Array.isArray(params.condition) &&
    params.condition.length > 0
  ) {
    filter.condition = { $in: params.condition };
  }

  const totalRecords = await Product.countDocuments(filter).exec();

  const sortCriteria: Record<string, 1 | -1> = {};
  if (params.sort === 'price') {
    sortCriteria.price = 1;
  } else {
    sortCriteria.name = 1;
  }

  const products = await Product.find(filter)
    .sort(sortCriteria)
    .skip(offset)
    .limit(size)
    .exec();

  return {
    items: products,
    totalRecords: totalRecords,
    currentPage: p,
    offset: offset,
  };
};

/**
 * Creates a new product in the database
 * @param product Product to be added
 * @returns Product that was added with its id assigned
 */
export const addProduct = (product: IProduct): Promise<IProduct> => {
  return Product.create(product);
};

/**
 * Updates a product in the database. Returns true if the product was updated, false otherwise.
 * @param product Updated product
 * @returns true if the product was updated, false otherwise
 */
export const updateProduct = async (product: IProduct): Promise<void> => {
  const res = await Product.updateOne({ _id: product._id }, product);

  if (res.modifiedCount === 0) {
    throw new NotFoundError(`Product with id ${product._id} not found`);
  }
};

/**
 * Finds a product by its id and tries to delete it. If the product is not found, a NotFoundError is thrown.
 * @param id id of the product to be deleted
 * @throws The {@link NotFoundError} if the product is not found
 */
export const deleteProduct = async (id: string): Promise<void> => {
  validateObjectId(id);

  const res = await Product.findByIdAndDelete(id).exec();

  if (!res) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
};
