import { Link } from "react-router-dom"
import logo from "./../../Media/logo.png"
import "./index.scss"
import Main from "./main"
import illustration from "./../../Media/Illustration.png"

const Contact = () => {
  return (
    <>
      <header>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </header>
      <img src={illustration} className="illustration" alt="" />
      <div className="overlay"></div>
      <Main />
    </>
  )
}

export default Contact
