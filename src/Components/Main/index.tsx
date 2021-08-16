import axios from "axios"
import React, { useState } from "react"
import { checkUserEndpoint } from "../../API_Endpoints"
import "./index.scss"

const Main = () => {
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
      const res = await axios[checkUserEndpoint.method](
        checkUserEndpoint.url,
        input,
        {
          withCredentials: true,
        }
      )
      console.log(res)
    } catch (err) {
      if (err.response) console.log(err.response.data)
      else console.log(err)
    }
  }

  return (
    <main>
      <p>
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
