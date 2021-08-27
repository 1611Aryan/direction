import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { checkUserEndpoint } from "../../API_Endpoints"
import "./index.scss"

const Main: React.FC<{
  setAccess: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setAccess }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const history = useHistory()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({ ...input, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios[checkUserEndpoint.method]<{
        access: boolean
        jwt?: string
      }>(
        checkUserEndpoint.url,
        {
          ...input,
          cookiesEnabled: navigator.cookieEnabled,
        },
        {
          withCredentials: true,
        }
      )
      res.data.jwt && history.push(`/?s=${res.data.jwt}`)
      setLoading(false)
      setAccess(res.data.access)
    } catch (err) {
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
        <span className="small">IIChE TIET's</span>
        <span>RECRUITMENT</span>
        <span className="grow">FORM</span>
      </p>

      <form onSubmit={submitHandler}>
        <div className="err">{err}</div>

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
      {loading && (
        <div className="loader">
          <div className="load"></div>
        </div>
      )}
    </main>
  )
}

export default Main
