import logo from "./../../Media/logo.png"
import Form from "./Form"
import illustration from "../../Media/Illustration.png"

import "./index.scss"
import { useState } from "react"
import Done from "./Done"

const Dashboard: React.FC<{
  name_email: {
    name: string
    email: string
  }
}> = ({ name_email }) => {
  const [done, setDone] = useState({
    done: false,
    success: false,
    message: "",
  })

  return (
    <div>
      <header>
        <img src={logo} alt="" />
      </header>
      <img className="illustration" src={illustration} alt="" />
      <div className="overlay"></div>
      {done.done ? (
        <Done done={done} />
      ) : (
        <Form name_email={name_email} setDone={setDone} />
      )}
    </div>
  )
}

export default Dashboard
