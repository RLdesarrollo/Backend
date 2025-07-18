import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import servicioModel from "@/models/location/servicio.model";
import { Servicio } from "location/servicio.type";


class ServicioService extends MongoDB<Servicio> {
  private static instance: ServicioService;
  private readonly defaultPopulate: Populate = {
    path: 'grupo',
    select: 'name'
  }

  private constructor() {
    super(Repository.create(servicioModel))
  }

  public static getInstance(): ServicioService {
    if (!ServicioService.instance) ServicioService.instance = new ServicioService()
    return ServicioService.instance;
  }
  /** Busca un servicio por su id en la base de datos */
  async findById(id: string): Promise<Result<Servicio | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  /** Busca servicios por query en la base de datos */
  async find(query?: Query, populate?: Populate): Promise<Result<Servicio[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  /** Crea un nuevo servicio en la base de datos */
  async create(data: Servicio): Promise<Result<Servicio>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un servicio por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Servicio>>): Promise<Result<Servicio | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un servicio por su id en la base de datos */
  async delete(id: string): Promise<Result<Servicio | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const servicioService = ServicioService.getInstance();