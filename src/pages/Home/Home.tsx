import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUserInfo } from "../../store/user/reducer"

import "./Home.css"
import { Row, Button } from "react-bootstrap"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import HighRatedMovies from "../../components/HighRatedMovies/HighRatedMovies"

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  //TODO use info
  const { username } = useSelector((state: any) => state.user.userInfo)

  // //TODO add a function "new from friends"

  return (
    <>
      <HighRatedMovies big={true} limit={4} />
      <PopularMovies />
    </>
  )
}

export default Home
