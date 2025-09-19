import { Router } from "express";
import {
  getCompanyDocuments,
  getCompanyDocument,
  createCompanyDocument,
  updateCompanyDocument,
  deleteCompanyDocument
} from "@/controllers/company/companyDocument.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validatorMiddleware } from "@/middlewares/validator.middleware";
import {
  createCompanyDocumentSchema,
  updateCompanyDocumentSchema,
  getCompanyDocumentsSchema
} from "@/schemas/company/companyDocument.schema";

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// GET /api/company/documents?companyId=xxx - Obtener documentos por companyId
router.get(
  '/documents',
  validatorMiddleware(getCompanyDocumentsSchema, 'query'),
  getCompanyDocuments
);

// GET /api/company/documents/:id - Obtener un documento específico
router.get('/documents/:id', getCompanyDocument);

// POST /api/company/documents - Crear nuevo documento
router.post(
  '/documents',
  validatorMiddleware(createCompanyDocumentSchema, 'body'),
  createCompanyDocument
);

// PUT /api/company/documents/:id - Actualizar documento
router.put(
  '/documents/:id',
  validatorMiddleware(updateCompanyDocumentSchema, 'body'),
  updateCompanyDocument
);

// DELETE /api/company/documents/:id - Eliminar documento
router.delete('/documents/:id', deleteCompanyDocument);

export default router;
