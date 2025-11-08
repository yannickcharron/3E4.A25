import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const explorationSchema = mongoose.Schema(
  {
    //TODO: Faire le schema d'une exploration
  },
  {
    collection: 'explorations',
    strict: 'throw',
    id: false,
  }
);

export default mongoose.model('Exploration', explorationSchema);
