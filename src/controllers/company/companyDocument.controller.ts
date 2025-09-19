import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { companyDocumentService } from "@/services/mongodb/company/companyDocument.service";
import { User } from "@/types/user/user.type";
import { Response } from "express";
import ErrorAPI, { BadRequest, NotFound } from "@/errors";
import { handlerResponse } from "@/errors/handler";

/**
 * Obtiene documentos de empresa por companyId
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía los documentos encontrados o un mensaje de error
 */
export const getCompanyDocuments = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { companyId } = query;
    
    if (!companyId) {
      throw new BadRequest({ message: 'companyId es requerido' });
    }

    const result = await companyDocumentService.getAll(user, query);
    if (!result.success) throw new ErrorAPI(result.error);
    
    send(res, 200, result.data);
  } catch (e) { 
    handlerResponse(res, e, "obtener los documentos de empresa"); 
  }
};

/**
 * Obtiene un documento específico por su ID
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el documento encontrado o un mensaje de error
 */
export const getCompanyDocument = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const result = await companyDocumentService.getOne(user, params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    
    send(res, 200, result.data);
  } catch (e) { 
    handlerResponse(res, e, "obtener el documento de empresa"); 
  }
};

/**
 * Crea un nuevo documento de empresa
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el documento creado o un mensaje de error
 */
export const createCompanyDocument = async ({ body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { name, type, uploadDate, size, url, description, companyId } = body;

    // Validar campos requeridos
    if (!name || !type || !uploadDate || !size || !url || !companyId) {
      throw new BadRequest({ 
        message: 'Todos los campos requeridos deben ser proporcionados' 
      });
    }

    const documentData = {
      name,
      type,
      uploadDate,
      size,
      url,
      description: description || "",
      companyId,
      createdBy: user._id || user.id
    };

    const result = await companyDocumentService.create(documentData);
    if (!result.success) throw new ErrorAPI(result.error);
    
    send(res, 201, result.data);
  } catch (e) { 
    handlerResponse(res, e, "crear el documento de empresa"); 
  }
};

/**
 * Actualiza un documento de empresa existente
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el documento actualizado o un mensaje de error
 */
export const updateCompanyDocument = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const result = await companyDocumentService.update(params.id, body);
    if (!result.success) throw new ErrorAPI(result.error);
    
    send(res, 200, result.data);
  } catch (e) { 
    handlerResponse(res, e, "actualizar el documento de empresa"); 
  }
};

/**
 * Elimina un documento de empresa
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de éxito o un mensaje de error
 */
export const deleteCompanyDocument = async ({ params }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const result = await companyDocumentService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    
    send(res, 200, result.data);
  } catch (e) { 
    handlerResponse(res, e, "eliminar el documento de empresa"); 
  }
};
