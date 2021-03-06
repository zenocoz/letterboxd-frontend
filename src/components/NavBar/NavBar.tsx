//hooks, context and redux
import { useContext, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { UserContext } from "../../context"
import { setKeyword, loadSearchResults } from "../../store/search/reducer"

//external libraries
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

//components
import letterboxd from "../../assets/logo_letterbox.png"
import CreateAccount from "../Auth/CreateAccount/CreateAccount"
import SignIn from "../Auth/SignIn/SignIn"
import { logoutUser } from "../../store/user/reducer"

//style
import "./NavBar.css"

const NavBar = () => {
  const history = useHistory()

  //user
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const { providerModals }: any = useContext(UserContext)
  const { createAccount, setCreateAccount } = providerModals.accountModal
  const { signIn, setSignIn } = providerModals.signInModal

  //Search Bar
  const [value, setSearchValue] = useState("")
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    dispatch(setKeyword(value))
    dispatch(loadSearchResults(value))
    setSearchValue("")
    history.push("/search")
  }

  const renderTooltip = (props: any) => (
    <Tooltip
      id="button-tooltip"
      {...props}
      onClick={() => {
        history.push("/user/" + userInfo._id)
      }}
    >
      Edit Profile
    </Tooltip>
  )

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Nav>
          <Link to={!loggedIn ? "/" : "/home"}>
            <img className="logo" src={letterboxd} alt={""} />
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {loggedIn ? (
              <>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Nav.Link
                    onClick={() => {
                      history.push("/home")
                    }}
                  >
                    {userInfo.username}
                  </Nav.Link>
                </OverlayTrigger>
                <Nav.Link
                  onClick={() => {
                    history.push("/activity")
                  }}
                >
                  ACTIVITY
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    history.push("/films")
                  }}
                >
                  FILMS
                </Nav.Link>
                {/* <Nav.Link>LISTS</Nav.Link> */}
                <Nav.Link
                  onClick={() => {
                    history.push("/club")
                  }}
                >
                  <div className="sign">
                    <span className="fast-flicker">F</span>ilm
                    <span className="flicker">C</span>lub
                  </div>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    history.push("/members")
                  }}
                >
                  MEMBERS
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    dispatch(logoutUser())

                    history.push("/")
                  }}
                >
                  LOG OUT
                </Nav.Link>
                <Nav>
                  <Form inline onSubmit={handleSubmit}>
                    <FormControl
                      type="text"
                      className="mr-sm-2 search-bar"
                      value={value}
                      onChange={handleSearch}
                    />
                  </Form>
                </Nav>
              </>
            ) : (
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr=auto nav-items xs-12 md-8 ">
                  <Nav.Link onClick={() => setSignIn(true)}>SIGN IN</Nav.Link>
                  <Nav.Link onClick={() => setCreateAccount(true)}>
                    CREATE ACCOUNT
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      history.push("/films")
                    }}
                  >
                    FILMS
                  </Nav.Link>
                  {/* <Nav.Link>LISTS</Nav.Link> */}
                  <Nav.Link
                    onClick={() => {
                      history.push("/club")
                    }}
                  >
                    FILM CLUB
                  </Nav.Link>

                  <Nav.Link
                    onClick={() => {
                      history.push("/members")
                    }}
                  >
                    MEMBERS
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Form inline onSubmit={handleSubmit}>
                    <FormControl
                      type="text"
                      className="mr-sm-2 search-bar"
                      value={value}
                      onChange={handleSearch}
                    />
                  </Form>
                </Nav>
              </Navbar.Collapse>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {createAccount === true && <CreateAccount />}
      {signIn === true && <SignIn />}

      {/* <Navbar collapseOnSelect variant="dark" expand="lg" fixed="top">
        <div className="container">
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

          <Nav>
            <Form inline onSubmit={handleSubmit}>
              <FormControl
                type="text"
                className="mr-sm-2 search-bar"
                value={value}
                onChange={handleSearch}
              />
            </Form>
          </Nav>
        </div>
      </Navbar>
      {createAccount === true && <CreateAccount />}
      {signIn === true && <SignIn />} */}
    </div>
  )
}

export default NavBar
