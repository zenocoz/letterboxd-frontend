//styles
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

//external dependencies
import { Route } from "react-router-dom"
import { Container } from "react-bootstrap"

//pages
import Landing from "./pages/Landing/Landing"
import Home from "./pages/Home/Home"
import Film from "./pages/Film/Film"

//components
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"

//hooks and react
import ContextProvider from "./context/ContextProvider"

function App() {
  return (
    <div className="app">
      <Container>
        <ContextProvider>
          <NavBar />
          <Route path="/" exact render={(props) => <Landing />}></Route>

          <Route path="/home" exact render={(props) => <Home />}></Route>
          <Route path="/film/:title" exact render={(props) => <Film />}></Route>
        </ContextProvider>

        <Footer />
      </Container>
    </div>
  )
}

export default App
