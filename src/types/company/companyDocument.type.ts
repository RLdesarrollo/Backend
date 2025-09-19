import { Document } from "mongoose";

export interface CompanyDocument extends Document {
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
  description?: string;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompanyDocumentRequest {
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
  description?: string;
  companyId: string;
  createdBy: string;
}

export interface UpdateCompanyDocumentRequest {
  name?: string;
  type?: string;
  uploadDate?: string;
  size?: string;
  url?: string;
  description?: string;
  companyId?: string;
}

export interface CompanyDocumentQuery {
  companyId?: string;
  createdBy?: string;
  type?: string;
  page?: number;
  limit?: number;
}
