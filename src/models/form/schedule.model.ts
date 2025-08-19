import { Schedule } from "form/schedule.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const scheduleSchema: Schema<Schedule> = new Schema({
  typeClassification: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  //relationship
  client: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    ref: 'headquarter',
    required: false
  },
  year: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  yearOperation: {
    type: String,
    required: false
  },
  monthOperation: {
    type: String,
    required: false
  },
}, configSchema);

export default mongoose.model('schedule', scheduleSchema);