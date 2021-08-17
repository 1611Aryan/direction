import axios from "axios"
import React, { useState } from "react"
import { checkUserEndpoint } from "../../API_Endpoints"
import "./index.scss"

const Main: React.FC<{
  setAccess: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setAccess }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({ ...input, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios[checkUserEndpoint.method]<{
        access: boolean
      }>(checkUserEndpoint.url, input, {
        withCredentials: true,
      })
      setAccess(res.data.access)
    } catch (err) {
      if (err.response) console.log(err.response.data)
      else console.log(err)
    }
  }

  return (
    <main>
      <p>
        <span className="small">IIChE TIET's</span>
        <span>RECRUITMENT</span>
        <span className="grow">FORM</span>
      </p>

      <form onSubmit={submitHandler}>
        <div className="inputContainer">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            autoFocus
            required
            onChange={changeHandler}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={input.email}
            required
            onChange={changeHandler}
          />
        </div>
        <button>Continue</button>
      </form>
    </main>
  )
}

export default Main
