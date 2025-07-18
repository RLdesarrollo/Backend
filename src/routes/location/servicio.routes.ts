import validateSchema from "@/middlewares/validator.middleware"
import servicioSchema from "@/schemas/location/servicio.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createState, getState, getStates, updateState, deleteState } from "@/controllers/location/servicio.controller"

const router = Router()

router.post('/servicio', authRequired, validateSchema(servicioSchema), createState)
router.get('/servicio/:id', authRequired, getState)
router.get('/servicios', authRequired, getStates)
router.put('/servicio/:id', authRequired, updateState)
router.delete('/servicio/:id', authRequired, deleteState)

export default router