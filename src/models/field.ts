import mongoose from '../database/connection';

const FieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  unity: {
    type: String,
    required: true,
    default: "hectares"
  },
  coordinates: { 
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  polygons: [[Number, Number]],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

interface Field extends mongoose.Document {
  name: string,
  size: number,
  unity: string,
  coordinates: {
    latitude: number,
    longitude: number,
  }
  polygons: [[number, number]]
}

const Field = mongoose.model<Field>('Field', FieldSchema)

export default Field;