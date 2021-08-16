import logo from "./../../Media/logo.png"
import Form from "./Form"
import illustration from "../../Media/Illustration.png"

import "./index.scss"
import { useState } from "react"
import Done from "./Done"

const Dashboard = () => {
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
      {done.done ? <Done done={done} /> : <Form setDone={setDone} />}
    </div>
  )
}

export default Dashboard
