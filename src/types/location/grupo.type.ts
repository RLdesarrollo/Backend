import { Document } from "mongoose"

export interface Grupo extends Document {
  name: string,
  active: boolean,  
  createdAt?: Date,
  updatedAt?: Date
}