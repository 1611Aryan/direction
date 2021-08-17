import React, { useState } from "react"

const Page3: React.FC<{
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

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(input => ({
      ...input,
      [e.target.name]: e.target.value,
    }))

    if (input.experience && input.aptitude && e.target.value) setFilled(true)
    else setFilled(false)
  }

  const previous = () => {
    if (pageContainerRef.current) {
      pageContainerRef.current.style.transform = "translateX(-33%)"
    }
  }

  return (
    <div className="page">
      <div className="textarea">
        <label htmlFor="song">Your favourite song that motivates you</label>
        <textarea
          className="experience"
          name="song"
          onChange={changeHandler}
          value={input.song}
        ></textarea>
      </div>
      <div className=" textarea">
        <label htmlFor="event">
          A change that you would suggest in previous events or an idea for a
          new event?
        </label>
        <textarea
          className="aptitude"
          name="event"
          onChange={changeHandler}
          value={input.event}
        ></textarea>
      </div>

      <div className="btnContainer">
        <button type="button" onClick={previous}>
          Previous
        </button>
        <button type="submit" className={filled ? "" : "disable"}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default Page3
