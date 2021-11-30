import { Request, Response } from "express-serve-static-core"
import User from "../Models/User.model"
import transporter from "../Nodemailer.config"

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

  const name =
    (req.body.name && (req.body.name.toString().trim() as string)) || null
  const email =
    (req.body.email && (req.body.email.toString().trim() as string)) || null

  const year =
    (req.body.year && (req.body.year.toString().trim() as string)) || null
  const branch =
    (req.body.branch && (req.body.branch.toString().trim() as string)) || null
  const department = (req.body.department as string[]) || null

  const phone =
    (req.body.phone && (req.body.phone.toString().trim() as string)) || null

  try {
    if (!year || !branch || !department || !email || !name || !phone) {
      console.log({
        year,
        branch,
        department,

        name,
        email,

        phone,
      })

      return res.status(400).send({ message: "Incorrect request" })
    }

    const userExistenceCheck = !!(await User.findOne({ email }).lean())
    if (userExistenceCheck) {
      console.log(`${name} used Submit ->Already Submitted`)

      return res.status(409).send({ message: "Already Filled the Form" })
    }

    await User.create({
      name,
      email,
      year,
      branch,
      department,

      phone,
    })

    const options = {
      from: process.env.NODEMAILER_SENDER,
      to: email,
      subject: "IIChE TIET Direction 2.0",
      html: `
          Hello ${name},
    <br />
    <br />
    We hope that you are doing great.
    <br />
    This mail is to confirm that we have successfully received your form for IIChE TIET's DIRECTION 2.0 .
    <br /><br />
    Looking Forward to seeing you on 4th December.
    <br /><br />
   
    If you have any query you can contact 
    <br />
    Parth Sood (GenSec) : 7986810284
    <br />
    Anushka Khera(GenSec) : 7428265269
    <br />
    Or simply reply to this mail thread
    <br /><br />
    Regards
    Team IIChE TIET
          `,
    }
    transporter.sendMail(options)

    return res.status(200).clearCookie("JWT_IIChE").send({ success: true })
  } catch (err) {
    console.log({ create: err })
    return res.status(500).send(err)
  }
}
