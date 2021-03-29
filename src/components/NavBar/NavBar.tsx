import { useContext, useState } from "react"
import { Navbar, Nav, Form, FormControl } from "react-bootstrap"
import letterboxd from "../../assets/letterboxd-logo-1000px.png"
import CreateAccount from "../Auth/CreateAccount/CreateAccount"
import SignIn from "../Auth/SignIn/SignIn"
import { Link } from "react-router-dom"
import { UserContext } from "../../context"
import { useHistory } from "react-router-dom"
import { API } from "../../API"
import "./NavBar.css"

const NavBar = () => {
  const history = useHistory()

  const { providerUser }: any = useContext(UserContext) //ANY
  const { user, setUser } = providerUser

  const { providerModals }: any = useContext(UserContext)
  const { createAccount, setCreateAccount } = providerModals.accountModal
  const { signIn, setSignIn } = providerModals.signInModal

  const [value, setSearchValue] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    console.log("submit")
    e.preventDefault()
    const movie = await API.getMoviesByTitle(value)
    setSearchValue("")
    console.log("movie", movie)
  }

  return (
    <div>
      <Navbar
        collapseOnSelect
        bg="dark"
        variant="dark"
        expand="lg"
        className="justify-content-between "
      >
        <Link to={user ? "/home" : "/"}>
          <img src={letterboxd} alt={""} />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {user ? (
          <Nav>
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
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr=auto nav-items xs-12 md-8 mb-4 ">
              <Nav.Link onClick={() => setSignIn(true)}>SIGN IN</Nav.Link>
              <Nav.Link onClick={() => setCreateAccount(true)}>
                CREATE ACCOUNT
              </Nav.Link>
              <Nav.Link href="#pricing">FILMS</Nav.Link>
              <Nav.Link href="#pricing">LISTS</Nav.Link>
              <Nav.Link href="#pricing">MEMBERS</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type="text"
            className="mr-sm-2 search-bar"
            value={value}
            onChange={handleSearch}
          />
        </Form>
      </Navbar>
      {createAccount === true && <CreateAccount />}
      {signIn === true && <SignIn />}
    </div>
  )
}

export default NavBar
