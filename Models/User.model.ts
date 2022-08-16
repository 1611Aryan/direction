import { model, Schema } from "mongoose"

export type UserI = {
  name: string
  email: string
  year: string
  branch: string
  department: string[]
  phone: string
  describe: string
  skills: string
  failure: string,
  achieve: string
  work_ethic: string
}

const UserSchema = new Schema<UserI>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    department: { type: Array, required: true },
    phone: { type: String, required: true },
    describe: { type: String, required: true },
    skills: { type: String, required: true },
    failure: { type: String, required: true },
    achieve: { type: String, required: true },
    work_ethic: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const User = model<UserI>("user", UserSchema, "users")

export default User
