import axios from "axios"
import React, { useState } from "react"

import { checkUserEndpoint } from "../../API_Endpoints"
import "./index.scss"

const Main: React.FC<{
  setAccess: React.Dispatch<React.SetStateAction<boolean>>
  setName_Email: React.Dispatch<
    React.SetStateAction<{
      name: string
      email: string
    }>
  >
  name_email: {
    name: string
    email: string
  }
}> = ({ setAccess, setName_Email, name_email }) => {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName_Email(input => ({ ...input, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios[checkUserEndpoint.method]<{
        access: boolean
      }>(checkUserEndpoint.url, name_email)

      setLoading(false)
      setAccess(res.data.access)
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data.message)
        setErr(err.response.data.message)
      } else {
        console.log(err)
        setErr("Please Try Again Later")
      }
      setLoading(false)
    }
  }

  return (
    <main>
      <p>
        <span className="small">ORION TIET's</span>
        <span>RECRUITMENTS</span>
        <span className="grow">2022-2023</span>
      </p>

      <form onSubmit={submitHandler}>
        <div className="err">{err}</div>

        <div className="inputContainer">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            value={name_email.name}
            autoFocus
            required
            onChange={changeHandler}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="email">Thapar Email</label>
          <input
            name="email"
            type="email"
            value={name_email.email}
            required
            onChange={changeHandler}
          />
        </div>
        <button>Continue</button>
      </form>
      {loading && (
        <div className="loader">
          <div className="load"></div>
        </div>
      )}
    </main>
  )
}

export default Main
