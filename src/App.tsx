import "./Styles/app.scss"
import logo from "./Media/logoBlack.png"
import chem from "./Media/chem.png"

const App = () => {
  return (
    <div className="App">
      <img src={chem} alt="illustration" className="illustration" />
      <div className="overlay"></div>
      <header>
        <img src={logo} alt="logo" />
      </header>

      <div className="formContainer"></div>
    </div>
  )
}

export default App
