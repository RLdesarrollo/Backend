import { z } from "zod";

const grupoSchema = z.object({
  name: z
    .string({ required_error: "Nombre de grupo requerido" })
    .min(3, { message: "Nombre de grupo debe tener al menos 3 caracteres" }),
})

export default grupoSchema