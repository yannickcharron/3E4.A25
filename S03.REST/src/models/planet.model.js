import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const planetSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true,  }, //uppercase: true
    uuid: { type: String, required: true, unique: true, default: () => uuidv4() },
    discoveredBy: { type: String, index: true,  }, //enum: []
    discoveryDate: Date,
    temperature: Number,
    satellites: [String],
    position: {
      x: { type: Number, required: true, min: -1000, max: 1000 },
      y: { type: Number, required: true, min: -1000, max: 1000 },
      z: { type: Number, required: true, min: -1000, max: 1000 },
    },
  },
  {
    collection: 'planets',
    strict: 'throw',
    timestamps: true,
  }
);

export default mongoose.model('Planet', planetSchema);
