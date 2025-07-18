import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import grupoModel from "@/models/location/grupo.model";
import { Grupo } from "@/types/location/grupo.type";

class GrupoService extends MongoDB<Grupo> {
  private static instance: GrupoService;

  private constructor() {
    super(Repository.create(grupoModel))
  }

  public static getInstance(): GrupoService {
    if (!GrupoService.instance) GrupoService.instance = new GrupoService()
    return GrupoService.instance;
  }
}

export const grupoService = GrupoService.getInstance();