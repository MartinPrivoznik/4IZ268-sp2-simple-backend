import Lookup, { ILookup } from '../models/Lookup';

const lookups: ILookup[] = [
  { label: 'Skladem', type: 'availability' },
  { label: 'Na objednávku', type: 'availability' },
  { label: 'Nové', type: 'condition' },
  { label: 'Zánovní', type: 'condition' },
  { label: 'Rozbalené', type: 'condition' },
  { label: 'Použité', type: 'condition' },
];

export const seedDatabase = async () => {
  try {
    const lookupCount = await Lookup.countDocuments();
    if (lookupCount === 0) {
      await Lookup.insertMany(lookups);
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
