import { Repository } from "@/types/repository.type";
import { CompanyDocument, CreateCompanyDocumentRequest, UpdateCompanyDocumentRequest, CompanyDocumentQuery } from "@/types/company/companyDocument.type";
import CompanyDocumentModel from "@/models/company/companyDocument.model";
import { User } from "@/types/user/user.type";

export const companyDocumentService: Repository<CompanyDocument, CreateCompanyDocumentRequest, UpdateCompanyDocumentRequest, CompanyDocumentQuery> = {
  async create(data: CreateCompanyDocumentRequest) {
    try {
      const document = new CompanyDocumentModel(data);
      const savedDocument = await document.save();
      await savedDocument.populate('createdBy', 'username email');
      return { success: true, data: savedDocument };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  },

  async getOne(user: User, id: string) {
    try {
      const document = await CompanyDocumentModel.findById(id).populate('createdBy', 'username email');
      if (!document) {
        return { success: false, error: 'Documento no encontrado' };
      }
      return { success: true, data: document };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  },

  async getAll(user: User, query: CompanyDocumentQuery) {
    try {
      const { companyId, createdBy, type, page = 1, limit = 10 } = query;
      
      // Construir filtros
      const filters: any = {};
      if (companyId) filters.companyId = companyId;
      if (createdBy) filters.createdBy = createdBy;
      if (type) filters.type = type;

      // Calcular paginación
      const skip = (page - 1) * limit;

      const documents = await CompanyDocumentModel.find(filters)
        .populate('createdBy', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await CompanyDocumentModel.countDocuments(filters);

      return {
        success: true,
        data: {
          documents,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        }
      };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  },

  async update(id: string, data: UpdateCompanyDocumentRequest) {
    try {
      const document = await CompanyDocumentModel.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      ).populate('createdBy', 'username email');

      if (!document) {
        return { success: false, error: 'Documento no encontrado' };
      }

      return { success: true, data: document };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  },

  async delete(id: string) {
    try {
      const document = await CompanyDocumentModel.findByIdAndDelete(id);
      if (!document) {
        return { success: false, error: 'Documento no encontrado' };
      }
      return { success: true, data: { message: 'Documento eliminado exitosamente' } };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  }
};
