import { useContext } from "react"
import { Navbar, Nav, Form, FormControl } from "react-bootstrap"
import letterboxd from "../../assets/letterboxd-logo-1000px.png"
import CreateAccount from "../Auth/CreateAccount/CreateAccount"
import SignIn from "../Auth/SignIn/SignIn"
import { Link } from "react-router-dom"
import { UserContext } from "../../context"
import { useHistory } from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {
  const history = useHistory()

  const { providerUser }: any = useContext(UserContext) //ANY
  const { user, setUser } = providerUser

  const { providerModals }: any = useContext(UserContext)
  const { createAccount, setCreateAccount } = providerModals.accountModal
  const { signIn, setSignIn } = providerModals.signInModal

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="justify-content-between ">
        <Link to={user ? "/home" : "/"}>
          <img src={letterboxd} alt={""} />
        </Link>
        {user ? (
          <Nav className="mr-auto nav-items xs-12 md-8 mb-4">
            <Nav.Link>{user}</Nav.Link>
            <Nav.Link>ACTIVITY</Nav.Link>
            <Nav.Link href="#pricing">FILMS</Nav.Link>
            <Nav.Link href="#pricing">LISTS</Nav.Link>
            <Nav.Link href="#pricing">MEMBERS</Nav.Link>
            <Nav.Link
              href="#pricing"
              onClick={() => {
                setUser(null)
                history.push("/")
              }}
            >
              LOG OUT
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="mr-auto nav-items xs-12 md-8 mb-4 ">
            <Nav.Link onClick={() => setSignIn(true)}>SIGN IN</Nav.Link>
            <Nav.Link onClick={() => setCreateAccount(true)}>
              CREATE ACCOUNT
            </Nav.Link>
            <Nav.Link href="#pricing">FILMS</Nav.Link>
            <Nav.Link href="#pricing">LISTS</Nav.Link>
            <Nav.Link href="#pricing">MEMBERS</Nav.Link>
          </Nav>
        )}
        <Form inline>
          <FormControl type="text" className="mr-sm-2 search-bar" />
        </Form>
      </Navbar>
      {createAccount === true && <CreateAccount />}
      {signIn === true && <SignIn />}
    </div>
  )
}

export default NavBar
