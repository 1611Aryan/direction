import axios from "axios"
import React, { useState } from "react"

import { createUserEndpoint } from "../../API_Endpoints"
import Page1 from "./Page1"

export type input = {
  year: string
  branch: string
  department: string[]
  phone: string
  describe: string
  skills: string
  failure: string
  achieve: string
  work_ethic: string
}

const Form: React.FC<{
  setDone: React.Dispatch<
    React.SetStateAction<{
      done: boolean
      success: boolean
      message: string
    }>
  >

  name_email: {
    name: string
    email: string
  }
}> = ({ setDone, name_email }) => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState<input>({
    year: "",
    branch: "",
    department: [],
    describe: "",
    phone: "",
    skills: "",
    failure: "",
    achieve: "",
    work_ethic: "",
  })

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    try {
      await axios[createUserEndpoint.method](
        createUserEndpoint.url,
        {
          ...input,
          ...name_email,
        },
        {
          withCredentials: true,
        }
      )

      setTimeout(() => {
        setLoading(false)
        setDone({
          done: true,
          success: true,
          message: "",
        })
      }, 200)
    } catch (err: any) {
      if (err.response) console.log(err.response.data)
      else console.log(err)

      if (err.response.data.message)
        setTimeout(() => {
          setLoading(false)
          setDone({
            done: true,
            success: false,
            message: err.response.data.message,
          })
        }, 200)
      else
        setTimeout(() => {
          setLoading(false)
          setDone({
            done: true,
            success: false,
            message: "We encountered and Error, Try again later",
          })
        }, 200)
    }
  }

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <Page1 input={input} setInput={setInput} />
      </form>
      {loading && (
        <div className="loader">
          <div className="load"></div>
        </div>
      )}
    </div>
  )
}

export default Form
