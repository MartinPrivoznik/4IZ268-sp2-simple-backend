import Lookup, { ILookup } from '../models/Lookup';

export const getLookupsByType = async (type: string): Promise<ILookup[]> => {
  return Lookup.where('type').equals(type).exec();
};
