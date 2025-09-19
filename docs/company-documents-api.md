# API de Documentos de Empresa

Esta API permite gestionar documentos asociados a empresas en el sistema.

## Endpoints Disponibles

### 1. Obtener Documentos por Empresa
**GET** `/api/company/documents?companyId={companyId}`

Obtiene todos los documentos asociados a una empresa específica.

#### Parámetros de Query:
- `companyId` (requerido): ID de la empresa
- `createdBy` (opcional): ID del usuario que creó el documento
- `type` (opcional): Tipo de documento
- `page` (opcional): Número de página para paginación
- `limit` (opcional): Cantidad de documentos por página

#### Ejemplo de Request:
```bash
GET /api/company/documents?companyId=provider-company-id&page=1&limit=10
```

#### Ejemplo de Response:
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Certificado ISO 9001",
        "type": "PDF",
        "uploadDate": "2024-01-15",
        "size": "2.3 MB",
        "url": "https://ejemplo.com/certificado-iso.pdf",
        "description": "Certificación de calidad ISO 9001:2015",
        "companyId": "provider-company-id",
        "createdBy": {
          "_id": "507f1f77bcf86cd799439011",
          "username": "ricardo",
          "email": "ricardo@empresa.com"
        },
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

### 2. Obtener Documento Específico
**GET** `/api/company/documents/{id}`

Obtiene un documento específico por su ID.

#### Ejemplo de Request:
```bash
GET /api/company/documents/507f1f77bcf86cd799439011
```

### 3. Crear Nuevo Documento
**POST** `/api/company/documents`

Crea un nuevo documento de empresa.

#### Body (JSON):
```json
{
  "name": "Certificado ISO 9001",
  "type": "PDF",
  "uploadDate": "2024-01-15",
  "size": "2.3 MB",
  "url": "https://ejemplo.com/certificado-iso.pdf",
  "description": "Certificación de calidad ISO 9001:2015",
  "companyId": "provider-company-id"
}
```

#### Campos Requeridos:
- `name`: Nombre del documento
- `type`: Tipo de documento (PDF, Excel, Word, etc.)
- `uploadDate`: Fecha de subida del documento
- `size`: Tamaño del archivo
- `url`: URL donde está almacenado el documento
- `companyId`: ID de la empresa

#### Campos Opcionales:
- `description`: Descripción del documento

#### Ejemplo de Response:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Certificado ISO 9001",
    "type": "PDF",
    "uploadDate": "2024-01-15",
    "size": "2.3 MB",
    "url": "https://ejemplo.com/certificado-iso.pdf",
    "description": "Certificación de calidad ISO 9001:2015",
    "companyId": "provider-company-id",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "ricardo",
      "email": "ricardo@empresa.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Actualizar Documento
**PUT** `/api/company/documents/{id}`

Actualiza un documento existente.

#### Body (JSON):
```json
{
  "name": "Certificado ISO 9001 Actualizado",
  "description": "Certificación de calidad ISO 9001:2015 - Versión actualizada"
}
```

Todos los campos son opcionales en la actualización.

### 5. Eliminar Documento
**DELETE** `/api/company/documents/{id}`

Elimina un documento específico.

#### Ejemplo de Response:
```json
{
  "success": true,
  "data": {
    "message": "Documento eliminado exitosamente"
  }
}
```

## Autenticación

Todos los endpoints requieren autenticación. Incluye el token de autenticación en el header:

```
Authorization: Bearer {tu-token}
```

## Códigos de Estado HTTP

- `200`: Operación exitosa
- `201`: Recurso creado exitosamente
- `400`: Error en la solicitud (datos faltantes o inválidos)
- `401`: No autorizado
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

## Ejemplos de Uso con cURL

### Obtener documentos de una empresa:
```bash
curl -X GET "http://localhost:3000/api/company/documents?companyId=provider-company-id" \
  -H "Authorization: Bearer tu-token"
```

### Crear un nuevo documento:
```bash
curl -X POST "http://localhost:3000/api/company/documents" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu-token" \
  -d '{
    "name": "Manual de Procedimientos",
    "type": "PDF",
    "uploadDate": "2024-02-01",
    "size": "3.2 MB",
    "url": "https://ejemplo.com/manual-procedimientos.pdf",
    "description": "Manual de procedimientos operativos",
    "companyId": "provider-company-id"
  }'
```

### Actualizar un documento:
```bash
curl -X PUT "http://localhost:3000/api/company/documents/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu-token" \
  -d '{
    "description": "Descripción actualizada del documento"
  }'
```

### Eliminar un documento:
```bash
curl -X DELETE "http://localhost:3000/api/company/documents/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer tu-token"
```

## Script de Datos de Prueba

Para insertar datos de prueba, ejecuta:

```bash
npx ts-node scripts/seedCompanyDocuments.ts
```

Este script insertará documentos de ejemplo en la base de datos para pruebas.
