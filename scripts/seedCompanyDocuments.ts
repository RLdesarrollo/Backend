import mongoose from 'mongoose';
import CompanyDocumentModel from '../src/models/company/companyDocument.model';
import config from '../src/utils/config';

const seedData = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(config.mongodbUri);
    console.log('Conectado a MongoDB');

    // Limpiar datos existentes (opcional)
    await CompanyDocumentModel.deleteMany({});
    console.log('Datos existentes eliminados');

    // Datos de ejemplo
    const sampleDocuments = [
      {
        name: "Certificado ISO 9001",
        type: "PDF",
        uploadDate: "2024-01-15",
        size: "2.3 MB",
        url: "https://ejemplo.com/certificado-iso.pdf",
        description: "Certificación de calidad ISO 9001:2015",
        companyId: "provider-company-id", // ID de Ricardo
        createdBy: "507f1f77bcf86cd799439011" // Reemplaza con un ObjectId válido
      },
      {
        name: "Manual de Servicios",
        type: "Documento",
        uploadDate: "2024-01-20",
        size: "1.8 MB",
        url: "https://ejemplo.com/manual-servicios.docx",
        description: "Manual completo de servicios ofrecidos",
        companyId: "provider-company-id",
        createdBy: "507f1f77bcf86cd799439011"
      },
      {
        name: "Política de Calidad",
        type: "PDF",
        uploadDate: "2024-01-25",
        size: "1.2 MB",
        url: "https://ejemplo.com/politica-calidad.pdf",
        description: "Política de calidad de la empresa",
        companyId: "provider-company-id",
        createdBy: "507f1f77bcf86cd799439011"
      },
      {
        name: "Registro de Capacitaciones",
        type: "Excel",
        uploadDate: "2024-02-01",
        size: "0.8 MB",
        url: "https://ejemplo.com/registro-capacitaciones.xlsx",
        description: "Registro de capacitaciones del personal",
        companyId: "provider-company-id",
        createdBy: "507f1f77bcf86cd799439011"
      }
    ];

    // Insertar datos
    const insertedDocuments = await CompanyDocumentModel.insertMany(sampleDocuments);
    console.log(`${insertedDocuments.length} documentos de prueba insertados exitosamente`);

    // Mostrar los documentos insertados
    console.log('\nDocumentos insertados:');
    insertedDocuments.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.name} - ${doc.type} - ${doc.companyId}`);
    });

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('\nConexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    process.exit(1);
  }
};

// Ejecutar el script
seedData();
