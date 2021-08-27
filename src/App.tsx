import { useState } from "react"
import Dashboard from "./Components/Dashboard"
import Header from "./Components/Header"
import Main from "./Components/Main"
import illustration from "./Media/Illustration.png"
import { Route, Switch, useHistory } from "react-router-dom"
import Contact from "./Components/Contact"
import { useEffect } from "react"

const App = () => {
  const [access, setAccess] = useState(false)
  const history = useHistory()

  useEffect(() => {
    history.replace("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Switch>
      <Route path="/contact" exact>
        <Contact />
      </Route>
      <Route path="/">
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
    </Switch>
  )
}

export default App
