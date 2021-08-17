import { Link } from "react-router-dom"
import logo from "./../../Media/logo.png"
import "./index.scss"

const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="" />
      <nav>
        <Link to="/contact">
          <button>Contact Us</button>
        </Link>
      </nav>
    </header>
  )
}

export default Header
