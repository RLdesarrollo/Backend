import { Grupo } from "location/grupo.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const grupoSchema: Schema<Grupo> = new Schema({
  name: {
    type: String,
    required: true
  }
}, configSchema);

export default mongoose.model('grupo', grupoSchema);