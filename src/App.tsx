import { useState } from "react"
import Dashboard from "./Components/Dashboard"
import Header from "./Components/Header"
import Main from "./Components/Main"
import illustration from "./Media/Illustration.png"
import { Route, Switch } from "react-router-dom"
import Contact from "./Components/Contact"

const App = () => {
  const [access, setAccess] = useState(false)

  const [name_email, setName_Email] = useState({
    name: "",
    email: "",
  })

  return (
    <Switch>
      <Route path="/contact" exact>
        <Contact />
      </Route>
      <Route path="/">
        {access ? (
          <Dashboard name_email={name_email} />
        ) : (
          <div>
            <Header />
            <img className="illustration" src={illustration} alt="" />
            <div className="overlay"></div>
            <Main
              name_email={name_email}
              setName_Email={setName_Email}
              setAccess={setAccess}
            />
          </div>
        )}
      </Route>
    </Switch>
  )
}

export default App
