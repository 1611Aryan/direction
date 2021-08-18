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
    phone: string
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
      phone: string
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

  const updateCheckBoxInput = (
    ref: React.RefObject<HTMLInputElement>,
    type: string
  ) => {
    if (ref.current && ref.current.checked)
      setInput(input => ({
        ...input,
        department: input.department[0] ? [...input.department, type] : [type],
      }))
    else
      setInput(input => ({
        ...input,
        department: input.department.filter(d => d !== type),
      }))
  }

  const checkBoxHandler = (type: string) => {
    if (type === "technical" && technicalInput.current) {
      technicalInput.current.checked = !technicalInput.current.checked
      updateCheckBoxInput(technicalInput, "technical")
    }
    if (type === "content" && contentInput.current) {
      contentInput.current.checked = !contentInput.current.checked
      updateCheckBoxInput(contentInput, "content")
    }
    if (type === "design" && designInput.current) {
      designInput.current.checked = !designInput.current.checked
      updateCheckBoxInput(designInput, "design")
    }
    if (type === "marketing" && marketingInput.current) {
      marketingInput.current.checked = !marketingInput.current.checked
      updateCheckBoxInput(marketingInput, "marketing")
    }

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
        designInput.current.checked)
    )
      setFilled(true)
    else setFilled(false)
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
      <div className="inputContainer">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          value={input.phone}
          name="phone"
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
          <label
            htmlFor="technical"
            onClick={() => checkBoxHandler("technical")}
          >
            Technical
          </label>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name="department"
            value="content"
            onChange={changeHandler}
            ref={contentInput}
          />
          <label htmlFor="content" onClick={() => checkBoxHandler("content")}>
            Content and Documentation
          </label>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name="department"
            value="marketing"
            onChange={changeHandler}
            ref={marketingInput}
          />
          <label
            htmlFor="marketing"
            onClick={() => checkBoxHandler("marketing")}
          >
            PR and Marketing
          </label>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name="department"
            value="design"
            onChange={changeHandler}
            ref={designInput}
          />
          <label htmlFor="design" onClick={() => checkBoxHandler("design")}>
            Engagement and Design
          </label>
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
