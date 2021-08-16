import { useState } from "react"
import Dashboard from "./Components/Dashboard"
import Header from "./Components/Header"
import Main from "./Components/Main"
import illustration from "./Media/Illustration.png"

const App = () => {
  const [access, setAccess] = useState(false)

  return access ? (
    <Dashboard />
  ) : (
    <div>
      <Header />
      <img className="illustration" src={illustration} alt="" />
      <div className="overlay"></div>
      <Main setAccess={setAccess} />
    </div>
  )
}

export default App
