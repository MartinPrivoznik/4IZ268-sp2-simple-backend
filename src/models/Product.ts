import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Product';

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  imagePath: string;
  availability: string;
  condition: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imagePath: { type: String, required: true },
    availability: {
      type: String,
      ref: 'Lookup',
      required: true,
    },
    condition: {
      type: String,
      ref: 'Lookup',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
productSchema.index({ name: 'text' });

const Product = model<IProduct>(DOCUMENT_NAME, productSchema);
export default Product;
