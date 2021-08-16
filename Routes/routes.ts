import { Router } from "express"

import {
  getUsers,
  userExistenceCheck,
  createUser,
} from "./../Controllers/user.controller"

const router = Router()

router.get("/user", getUsers)

router.post("/check", userExistenceCheck)

router.post("/user", createUser)

export default router
