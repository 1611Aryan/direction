import { Request, Response } from "express-serve-static-core"
import User from "../Models/User.model"
import jwt from "jsonwebtoken"

type controller = (req: Request, res: Response) => Promise<Response>

export const getUsers: controller = async (req, res) => {
  try {
    const users = await User.find({}).lean()
    if (users.length > 0) return res.status(200).send(users)
    return res.status(200).send("No Users")
  } catch (err) {
    console.log({ get: err })
    return res.status(err).send(err)
  }
}

export const userExistenceCheck: controller = async (req, res) => {
  const name = req.body.name && req.body.name.toString().trim()
  const email = req.body.email && req.body.email.toString().trim()

  try {
    if (!email || !name) return res.sendStatus(400)
    const user = !!(await User.findOne({ email }).lean())

    if (user) return res.sendStatus(409)

    const payload = {
      name,
      email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return res
      .status(200)
      .cookie("JWT-IIChE", token, {
        //? 3 Hour
        maxAge: 10_800_000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .send({
        access: true,
      })
  } catch (err) {
    console.log({
      userExistCheck: err,
    })

    return res.status(500).send(err)
  }
}

export const createUser: controller = async (req, res) => {
  const year = req.body.year && req.body.year.toString().trim()
  const branch = req.body.branch && req.body.branch.toString().trim()
  const department = req.body.department
  const experience =
    req.body.experience && req.body.experience.toString().trim()
  const aptitude = req.body.aptitude && req.body.aptitude.toString().trim()

  const token = req.cookies["JWT-IIChE"]
  console.log(token)

  try {
    if (!year || !branch || !department || !experience || !aptitude || !token)
      return res.sendStatus(400)

    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      name: string
      email: string
    }

    console.log(payload)

    const name = payload.name
    const email = payload.email

    const userExistenceCheck = !!(await User.findOne({ email }).lean())
    if (userExistenceCheck)
      return res.status(409).send({ message: "Already Filled the Form" })

    const user = await User.create({
      name,
      email,
      year,
      branch,
      department,
      experience,
      aptitude,
    })

    return res.status(200).clearCookie("JWT_IIChE").send({ success: true })
  } catch (err) {
    console.log({ create: err })
    return res.status(500).send(err)
  }
}
