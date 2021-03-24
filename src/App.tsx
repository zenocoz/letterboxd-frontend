import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import { Container } from "react-bootstrap"
import Landing from "./pages/Landing/Landing"
import Home from "./pages/Home/Home"
import Footer from "./components/Footer/Footer"
import ContextProvider from "./context/ContextProvider"

function App() {
  return (
    <div className="app">
      <Container>
        <ContextProvider>
          <NavBar />
          <Route path="/" exact render={(props) => <Landing />}></Route>

          <Route path="/home" exact render={(props) => <Home />}></Route>
        </ContextProvider>

        <Footer />
      </Container>
    </div>
  )
}

export default App
