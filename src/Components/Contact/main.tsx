import { FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa"
import contact from "./../../Media/contact.png"

const Main = () => {
  return (
    <main className="contact">
      <div className="content">
        <h1>Get in Touch</h1>

        <div className="numbers">
          <p>
            <span>Anushka:</span> <span className="number">+917428265269</span>
          </p>
          <p>
            <span>Parth:</span> <span className="number">+917986810284</span>
          </p>
        </div>

        <div className="icons">
          <a
            href="https://www.instagram.com/iiche.tiet/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/iiche.tiet"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookSquare />
          </a>

          <a
            href="https://www.linkedin.com/company/indian-institute-of-chemical-engineers-iiche-tiet/"
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
