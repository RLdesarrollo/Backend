import validateSchema from "@/middlewares/validator.middleware"
import grupoSchema from "@/schemas/location/grupo.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createGrupo, getGrupo, getGrupos, updateGrupo, deleteGrupo } from "@/controllers/location/grupo.controller"

const router = Router()

router.post('/grupo', authRequired, validateSchema(grupoSchema), createGrupo)
router.get('/grupo/:id', authRequired, getGrupo)
router.get('/grupos', authRequired, getGrupos)
router.put('/grupo/:id', authRequired, updateGrupo)
router.delete('/grupo/:id', authRequired, deleteGrupo)

export default router