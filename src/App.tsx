import { useState } from "react"
import Dashboard from "./Components/Dashboard"
import Header from "./Components/Header"
import Main from "./Components/Main"
import illustration from "./Media/Illustration.png"
import { Route, Switch } from "react-router-dom"
import Contact from "./Components/Contact"

const App = () => {
  const [access, setAccess] = useState(false)

  return (
    <Switch>
      <Route path="/" exact>
        {access ? (
          <Dashboard />
        ) : (
          <div>
            <Header />
            <img className="illustration" src={illustration} alt="" />
            <div className="overlay"></div>
            <Main setAccess={setAccess} />
          </div>
        )}
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
    </Switch>
  )
}

export default App
