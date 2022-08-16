import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa"
import contact from "./../../Media/contact.png"

const Main = () => {
  return (
    <main className="contact">
      <div className="content">
        <h1>Get in Touch</h1>

        <div className="numbers">
          <p>
            <span>Yashica:</span> <span className="number">+91 9873131504</span>
          </p>
          <p>
            <span>Parth:</span> <span className="number">+91 7986810284</span>
          </p>
        </div>

        <div className="icons">
          <a
            href="https://www.instagram.com/oriontiet/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/oriontiet"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookSquare />
          </a>

          <a
            href="https://www.linkedin.com/company/oriontiet/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="contactImg">
          <img src={contact} alt="" />
        </div>
      </div>
    </main>
  )
}

export default Main
