import { Request, Response } from "express-serve-static-core"
import User, { UserI } from "../Models/User.model"

type controller = (req: Request, res: Response) => Promise<Response>

const toBool = (input: string) => {
  if (input === "false") return false

  return true
}

export const getUsers: controller = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    ).lean()
    if (users.length > 0)
      return res.status(200).send({
        length: users.length,
        users,
      })
    return res.status(200).send("No Users")
  } catch (err) {
    console.log({ get: err })
    return res.status(err).send(err)
  }
}

export const userExistenceCheck: controller = async (req, res) => {
  if (!toBool(process.env.isActive))
    return res.status(403).send({ message: "The form has been closed" })

  const name =
    (req.body.name && (req.body.name.toString().trim() as string)) || null
  const email =
    (req.body.email && (req.body.email.toString().trim() as string)) || null

  try {
    if (!email || !name) {
      console.log({
        email,
        name,
      })
      console.log(`${name} used Check -> failed due to bad request`)
      return res.sendStatus(400)
    }
    const user = !!(await User.findOne({ email }).lean())

    if (user) {
      console.log(`${name} used Check -> Already Submitted `)
      return res.status(409).send({ message: "Already Submitted" })
    }

    console.log(`${name} used Check -> Success `)

    return res.status(200).send({
      access: true,
    })
  } catch (err) {
    console.log({
      userExistCheck: err,
    })
    console.log(`${name} used Check ->Failed`)
    return res.status(500).send(err)
  }
}

export const createUser: controller = async (req, res) => {
  if (!toBool(process.env.isActive))
    return res.status(403).send({ message: "The form has been closed" })

  const { name, email, year, branch, department, phone, describe, skills, failure, achieve, work_ethic, idea } = req.body as UserI

  try {
    if (!year || !branch || !department || !department[0] || !email || !name || !phone || !describe || !skills || !failure || !achieve || !work_ethic || !idea) {

      return res.status(400).send({ message: "Incorrect request" })
    }

    const userExistenceCheck = !!(await User.findOne({ email }).lean())
    if (userExistenceCheck) {
      console.log(`${name} used Submit ->Already Submitted`)

      return res.status(409).send({ message: "Already Filled the Form" })
    }

    await User.create({
      name, email, year, branch, department, phone, describe, skills, failure, achieve, work_ethic, idea
    })



    return res.status(200).send({ success: true })
  } catch (err) {
    console.log({ create: err })
    return res.status(500).send(err)
  }
}
