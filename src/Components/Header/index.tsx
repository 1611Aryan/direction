import logo from "./../../Media/logo.png"
import "./index.scss"

const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="" />
      <nav>
        <button>Contact Us</button>
      </nav>
    </header>
  )
}

export default Header
