//hooks and context
import { useContext, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { UserContext } from "../../context"

//external libraries
import { Navbar, Nav, Form, FormControl } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

//components
import letterboxd from "../../assets/letterboxd-logo-1000px.png"
import CreateAccount from "../Auth/CreateAccount/CreateAccount"
import SignIn from "../Auth/SignIn/SignIn"
import { API } from "../../API"
import { logoutUser } from "../../store/user/reducer"

//style
import "./NavBar.css"

const NavBar = () => {
  const history = useHistory()

  //user
  const { _id, username } = useSelector((state: any) => state.user.userInfo)
  // const [componentInfo, setComponentInfo] = useState<any>(null)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   setComponentInfo(userInfo)
  // }, [userInfo])

  //Context
  const { providerUser }: any = useContext(UserContext) //ANY used only for developing
  const { user, setUser } = providerUser

  const { providerModals }: any = useContext(UserContext)
  const { createAccount, setCreateAccount } = providerModals.accountModal
  const { signIn, setSignIn } = providerModals.signInModal

  //Search Bar
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
        <Link to={username !== null ? "/home" : "/"}>
          <img src={letterboxd} alt={""} />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {username !== null ? (
          <Nav>
            <Nav.Link>{username}</Nav.Link>
            <Nav.Link>ACTIVITY</Nav.Link>
            <Nav.Link href="#pricing">FILMS</Nav.Link>
            <Nav.Link href="#pricing">LISTS</Nav.Link>
            <Nav.Link href="#pricing">MEMBERS</Nav.Link>
            <Nav.Link
              href="#pricing"
              onClick={() => {
                dispatch(logoutUser())

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
