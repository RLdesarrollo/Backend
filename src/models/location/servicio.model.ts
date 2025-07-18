import { Servicio } from "@/types/location/servicio.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const servicioSchema: Schema<Servicio> = new Schema({
  name: {
    type: String,
    required: true
  },
  grupo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'grupo'
  }
}, configSchema);

export default mongoose.model('servicio', servicioSchema);