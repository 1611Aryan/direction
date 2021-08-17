import { Request, Response } from "express-serve-static-core"
import User from "../Models/User.model"
import jwt from "jsonwebtoken"
import { transporter } from "./../server"

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

    if (user) return res.status(409).send({ message: "Already Submitted" })

    const payload = {
      name,
      email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return res
      .status(200)
      .cookie("JWT-IIChE", token, {
        //? 1 Day
        maxAge: 86_400_000,
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
  const song = req.body.song && req.body.song.toString().trim()
  const event = req.body.event && req.body.event.toString().trim()
  const phone = req.body.phone && req.body.phone.toString().trim()

  const token = req.cookies["JWT-IIChE"]

  try {
    if (
      !year ||
      !branch ||
      !department ||
      !experience ||
      !aptitude ||
      !token ||
      !song ||
      !event ||
      !phone
    )
      return res.sendStatus(400)

    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      name: string
      email: string
    }

    const name = payload.name
    const email = payload.email

    const userExistenceCheck = !!(await User.findOne({ email }).lean())
    if (userExistenceCheck)
      return res.status(409).send({ message: "Already Filled the Form" })

    await User.create({
      name,
      email,
      year,
      branch,
      department,
      experience,
      aptitude,
      song,
      event,
      phone,
    })

    const options = {
      from: process.env.NODEMAILER_SENDER,
      to: email,
      subject: "IIChE TIET Recruitments",
      html: `
      Hello ${name},
<br />
<br />
We hope that you and your family are doing great during this pandemic.
<br />
This mail is to confirm that we have successfully received your recruitment form for IIChE TIET and our team will shortly contact you with further information.
<br /><br />
We recommend you to stay active on your gmail and WhatsApp.
<br /><br />
Good Luck for the next round!!
<br /><br />
If you have any query you can contact the following people
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
