import { Document, Schema } from "mongoose"

export interface Schedule extends Document {
  typeClassification: string,
  type: string,
  name: string,
  url: string,

  client: Schema.Types.ObjectId,
  createdBy: Schema.Types.ObjectId,
  headquarter?: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date,
  year: string,
  month: string,
  yearOperation?: string,
  monthOperation?: string
}