import { CompanyDocument } from "@/types/company/companyDocument.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const companyDocumentSchema: Schema<CompanyDocument> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  uploadDate: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  companyId: {
    type: String,
    required: true,
    index: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, configSchema);

// Índices para optimizar consultas
companyDocumentSchema.index({ companyId: 1 });
companyDocumentSchema.index({ createdBy: 1 });

export default mongoose.model('CompanyDocument', companyDocumentSchema);
