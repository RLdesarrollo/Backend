import { z } from "zod";

export const createCompanyDocumentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  type: z.string().min(1, "El tipo es requerido").trim(),
  uploadDate: z.string().min(1, "La fecha de subida es requerida"),
  size: z.string().min(1, "El tamaño es requerido"),
  url: z.string().url("Debe ser una URL válida"),
  description: z.string().optional().default(""),
  companyId: z.string().min(1, "El ID de la empresa es requerido"),
  createdBy: z.string().min(1, "El ID del creador es requerido")
});

export const updateCompanyDocumentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim().optional(),
  type: z.string().min(1, "El tipo es requerido").trim().optional(),
  uploadDate: z.string().min(1, "La fecha de subida es requerida").optional(),
  size: z.string().min(1, "El tamaño es requerido").optional(),
  url: z.string().url("Debe ser una URL válida").optional(),
  description: z.string().optional(),
  companyId: z.string().min(1, "El ID de la empresa es requerido").optional()
});

export const getCompanyDocumentsSchema = z.object({
  companyId: z.string().min(1, "El companyId es requerido"),
  createdBy: z.string().optional(),
  type: z.string().optional(),
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional()
});

export type CreateCompanyDocumentInput = z.infer<typeof createCompanyDocumentSchema>;
export type UpdateCompanyDocumentInput = z.infer<typeof updateCompanyDocumentSchema>;
export type GetCompanyDocumentsInput = z.infer<typeof getCompanyDocumentsSchema>;
