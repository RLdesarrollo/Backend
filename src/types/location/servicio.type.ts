import { Document, Schema } from "mongoose"

export interface Servicio extends Document {
  name: string,
  grupo: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}