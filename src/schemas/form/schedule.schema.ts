import { z } from "zod";

const scheduleSchema = z.object({
  typeClassification: z
    .string({ required_error: "El tipo de clasificación es requerido" }),
  type: z
    .string({ required_error: "El tipo es requerido" }),
  name: z
    .string({ required_error: "El nombre es requerido" }),
  url: z
    .string({ required_error: "La url es requerida" }),

  //references
  client: z
    .string({ required_error: "El ID del cliente es requerido" }),
  createdBy: z
    .string({ required_error: "El ID del creador es requerido" }),
  headquarter: z
    .string({ required_error: "El ID de la sede es requerido" })
    .optional(),
  yearOperation: z
    .string({ required_error: "El año de operación es requerido" })
    .optional(),
  monthOperation: z
    .string({ required_error: "El mes de operación es requerido" })
    .optional(),
})

export default scheduleSchema