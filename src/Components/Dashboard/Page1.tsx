import React, { useState } from "react"
import { useRef } from "react"

const Page1: React.FC<{
  pageContainerRef: React.RefObject<HTMLDivElement>
  input: {
    year: string
    branch: string
    department: string[]
    experience: string
    aptitude: string
    song: string
    event: string
  }
  setInput: React.Dispatch<
    React.SetStateAction<{
      year: string
      branch: string
      department: string[]
      experience: string
      aptitude: string
      song: string
      event: string
    }>
  >
}> = ({ pageContainerRef, input, setInput }) => {
  const [filled, setFilled] = useState(false)

  const technicalInput = useRef<HTMLInputElement>(null)
  const contentInput = useRef<HTMLInputElement>(null)
  const marketingInput = useRef<HTMLInputElement>(null)
  const designInput = useRef<HTMLInputElement>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      input.year &&
      input.branch &&
      technicalInput.current &&
      contentInput.current &&
      marketingInput.current &&
      designInput.current &&
      (technicalInput.current.checked ||
        contentInput.current.checked ||
        marketingInput.current.checked ||
        designInput.current.checked) &&
      e.target.value
    )
      setFilled(true)
    else setFilled(false)

    setInput(input => {
      if (e.target.name !== "department")
        return {
          ...input,
          [e.target.name]: e.target.value,
        }

      const department = []

      if (
        technicalInput.current &&
        contentInput.current &&
        marketingInput.current &&
        designInput.current
      ) {
        if (technicalInput.current.checked) department.push("technical")
        if (contentInput.current.checked) department.push("content")
        if (marketingInput.current.checked) department.push("marketing")
        if (designInput.current.checked) department.push("design")
      }

      return {
        ...input,
        department,
      }
    })
  }

  const next = () => {
    if (pageContainerRef.current) {
      pageContainerRef.current.style.transform = "translateX(-33.3%)"
    }
  }

  return (
    <div className="page">
      <div className="inputContainer">
        <label htmlFor="year">Year</label>
        <input
          type="text"
          value={input.year}
          name="year"
          onChange={changeHandler}
          autoFocus
          required
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="branch">Branch</label>
        <input
          type="text"
          name="branch"
          value={input.branch}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="checkbox">
        <label htmlFor="department" className="label__header">
          Department of Choice
        </label>

        <div className="option">
          <input
            type="checkbox"
            name="department"
            value="technical"
            onChange={changeHandler}
            ref={technicalInput}
          />
          <label htmlFor="technical">Technical</label>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name="department"
            value="content"
            onChange={changeHandler}
            ref={contentInput}
          />
          <label htmlFor="content">Content and Documentation</label>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name="department"
            value="marketing"
            onChange={changeHandler}
            ref={marketingInput}
          />
          <label htmlFor="marketing">PR and Marketing</label>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name="department"
            value="design"
            onChange={changeHandler}
            ref={designInput}
          />
          <label htmlFor="design">Engagement and Design</label>
        </div>
      </div>
      <div className="btnContainer">
        <button
          type="button"
          className={filled ? "" : "disable"}
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Page1
