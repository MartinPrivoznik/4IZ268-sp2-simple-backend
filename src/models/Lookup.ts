import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Lookup';

export interface ILookup {
  _id?: string;
  label: string;
  type: string;
}

const lookupSchema = new Schema<ILookup>({
  label: { type: String, required: true },
  type: { type: String, required: true },
});

const Lookup = model<ILookup>(DOCUMENT_NAME, lookupSchema);
export default Lookup;
