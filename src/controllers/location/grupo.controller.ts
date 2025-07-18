/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar grupos */
import { grupoService } from "@/services/mongodb/location/grupo.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express"
/**
 * Obtiene un grupo específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del grupo en params.id.
 * @returns {Promise<void>} - Envía el grupo encontrado o un mensaje de error.
 */
export const getGrupo = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const grupo = await grupoService.findById(params.id);
    if (!grupo.success) throw new ErrorAPI(grupo.error);
    send(res, 200, grupo.data);
  } catch (e) { handlerResponse(res, e, "obtener el grupo") }
}

/**
 * Obtiene todos los grupos.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía todos los grupos encontrados o un mensaje de error.
 */
export const getGrupos = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const grupos = await grupoService.find(body.query);
    if (!grupos.success) throw new ErrorAPI(grupos.error);
    send(res, 200, grupos.data);
  } catch (e) { handlerResponse(res, e, "obtener los grupos") }
}

/**
 * Crea un nuevo grupo.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del grupo en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el grupo creado o un mensaje de error.
 */
export const createGrupo = async (req: Request, res: Response): Promise<void> => {
  try {
    const grupo = await   grupoService.create(req.body);
    if (!grupo.success) throw new ErrorAPI(grupo.error);
    send(res, 201, grupo.data);
  } catch (e) { handlerResponse(res, e, "crear el grupo") }
}

/**
 * Actualiza un grupo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del grupo en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el grupo actualizado o un mensaje de error.
 */
export const updateGrupo = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const grupo = await grupoService.update(params.id, body);
    if (!grupo.success) throw new ErrorAPI(grupo.error);
    send(res, 200, grupo.data);
  } catch (e) { handlerResponse(res, e, "actualizar el grupo") }
}

/**
 * Elimina un grupo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del grupo en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export const deleteGrupo = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const grupo = await grupoService.delete(params.id);
    if (!grupo.success) throw new ErrorAPI(grupo.error);
    send(res, 200, grupo.data);
  } catch (e) { handlerResponse(res, e, "eliminar el grupo") }
}