import { Schema, model, Document } from "mongoose"

export type UserI = {
  name: string
  email: string
  year: string
  branch: string
  department: string
  experience: string
  aptitude: string
  song: string
  event: string
  phone: string
}

const UserSchema = new Schema<UserI>(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    department: { type: Array, required: true },
    experience: { type: String, required: true },
    aptitude: { type: String, required: true },
    song: { type: String, required: true },
    event: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const User = model<UserI>("user", UserSchema, "users")

export default User
