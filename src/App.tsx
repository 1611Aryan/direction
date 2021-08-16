import Header from "./Components/Header"
import Main from "./Components/Main"
import illustration from "./Media/Illustration.png"

const App = () => {
  return (
    <div>
      <Header />
      <img className="illustration" src={illustration} alt="" />
      <div className="overlay"></div>
      <Main />
    </div>
  )
}

export default App
