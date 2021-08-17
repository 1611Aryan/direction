import axios from "axios"
import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { createUserEndpoint } from "../../API_Endpoints"
import Page1 from "./Page1"
import Page2 from "./Page2"
import Page3 from "./Page3"

const Form: React.FC<{
  setDone: React.Dispatch<
    React.SetStateAction<{
      done: boolean
      success: boolean
      message: string
    }>
  >
}> = ({ setDone }) => {
  const pageContainerRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState<{
    year: string
    branch: string
    department: string[]
    experience: string
    aptitude: string
    song: string
    event: string
  }>({
    year: "",
    branch: "",
    department: [""],
    experience: "",
    aptitude: "",
    song: "",
    event: "",
  })

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !input.aptitude ||
      !input.branch ||
      !input.department ||
      !input.department[0] ||
      !input.event ||
      !input.experience ||
      !input.song ||
      !input.year
    )
      return

    setLoading(true)
    try {
      await axios[createUserEndpoint.method](createUserEndpoint.url, input, {
        withCredentials: true,
      })

      setTimeout(() => {
        setLoading(false)
        setDone({
          done: true,
          success: true,
          message: "",
        })
      }, 500)
    } catch (err) {
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
        }, 500)
      else
        setTimeout(() => {
          setLoading(false)
          setDone({
            done: true,
            success: false,
            message: "We encountered and Error, Try again later",
          })
        }, 500)
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
          <Page2
            pageContainerRef={pageContainerRef}
            input={input}
            setInput={setInput}
          />
          <Page3
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
