import axios from "axios"
import React, { useState, useRef } from "react"

import { createUserEndpoint } from "../../API_Endpoints"
import Page1 from "./Page1"

export type input = {
  year: string
  branch: string
  department: string[]

  phone: string
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
  const pageContainerRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState<input>({
    year: "",
    branch: "",
    department: [""],

    phone: "",
  })

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !input.branch.trim() ||
      !input.department ||
      !input.department[0].trim() ||
      !input.year.trim() ||
      !input.phone.trim()
    ) {
      console.error({
        message: "Input Field is Empty",
      })
      return
    }

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
        <div className="pageContainer" ref={pageContainerRef}>
          <Page1
            pageContainerRef={pageContainerRef}
            input={input}
            setInput={setInput}
          />
        </div>
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