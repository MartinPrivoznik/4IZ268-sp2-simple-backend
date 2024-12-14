import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Product';

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
productSchema.index({ name: 'text' });

const Product = model<IProduct>(DOCUMENT_NAME, productSchema);
export default Product;
