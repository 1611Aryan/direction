import React, { useState } from "react"

const Page2: React.FC<{
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

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(input => ({
      ...input,
      [e.target.name]: e.target.value,
    }))

    if (input.experience && input.aptitude && e.target.value) setFilled(true)
    else setFilled(false)
  }

  const previous = () => {
    if (pageContainerRef.current)
      pageContainerRef.current.style.transform = "translateX(0%)"
  }
  const next = () => {
    if (pageContainerRef.current)
      pageContainerRef.current.style.transform = "translateX(-66.6%)"
  }

  return (
    <div className="page">
      <div className="textarea">
        <label htmlFor="experience">
          Any Previous Experience you would like to share?
        </label>
        <textarea
          className="experience"
          name="experience"
          onChange={changeHandler}
          value={input.experience}
        ></textarea>
      </div>
      <div className=" textarea">
        <label htmlFor="aptitude">
          If you could send one message to everyone’s phone, what would that be?
        </label>
        <textarea
          className="aptitude"
          name="aptitude"
          onChange={changeHandler}
          value={input.aptitude}
        ></textarea>
      </div>

      <div className="btnContainer">
        <button type="button" onClick={previous}>
          Previous
        </button>
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

export default Page2
