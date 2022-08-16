import React, { useEffect, useRef, useState } from "react"
import { input } from "./Form"

const Page1: React.FC<{
  input: input
  setInput: React.Dispatch<React.SetStateAction<input>>
}> = ({ input, setInput }) => {
  const [filled, setFilled] = useState(false)

  const technicalInput = useRef<HTMLInputElement>(null)
  const contentInput = useRef<HTMLInputElement>(null)
  const marketingInput = useRef<HTMLInputElement>(null)
  const designInput = useRef<HTMLInputElement>(null)

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setInput(input => {
      if (e.target.name !== "department")
        return {
          ...input,
          [e.target.name]: e.target.value.toString(),
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

  const InputsNotEmpty = (input: input): boolean => {
    let i = true
    Object.values(input).forEach(val => {
      if (val === "" || val === [] || (Array.isArray(val) && val[0] === ""))
        i = false
    })
    return i
  }

  useEffect(() => {
    if (
      InputsNotEmpty(input) &&
      (technicalInput.current?.checked ||
        contentInput.current?.checked ||
        designInput.current?.checked ||
        marketingInput.current?.checked)
    )
      setFilled(true)
    else setFilled(false)
  }, [input])

  const updateCheckBoxInput = (
    ref: React.RefObject<HTMLInputElement>,
    type: string
  ) => {
    if (ref.current && ref.current.checked)
      setInput(input => ({
        ...input,
        department: [...input.department, type],
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
        <label htmlFor="phone">Whatsapp Number</label>
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
      <div className="inputContainer">
        <label htmlFor="describe">Describe Yourself in One Word</label>
        <input
          type="text"
          value={input.describe}
          name="describe"
          onChange={changeHandler}
          required
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="skills">Mention a few of your skills</label>
        <textarea
          value={input.skills}
          name="skills"
          onChange={changeHandler}
          required
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="failure">
          List one of your biggest failure till date and how you faced through
          it?
        </label>
        <textarea
          value={input.failure}
          name="failure"
          onChange={changeHandler}
          required
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="achieve">
          What do you think you can achieve in this fest that you can't at other
          fest/societies?
        </label>
        <textarea
          value={input.achieve}
          name="achieve"
          onChange={changeHandler}
          required
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="work_ethic">
          In your opinion, is it better to do work that's perfect but late, or
          good and on time?
        </label>
        <textarea
          value={input.work_ethic}
          name="work_ethic"
          onChange={changeHandler}
          required
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="idea">
          Suggest any Idea for an event you would like to conduct. Be as
          creative as you can be!
        </label>
        <textarea
          value={input.idea}
          name="idea"
          onChange={changeHandler}
          required
        />
      </div>
      <div className="btnContainer">
        <button className={filled ? "" : "disable"}>Submit</button>
      </div>
    </div>
  )
}

export default Page1
