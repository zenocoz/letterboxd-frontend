import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUserInfo } from "../../store/user/reducer"

import "./Home.css"
import { IMovie } from "../../interface"
import { Row, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import HighRatedMovies from "../../components/HighRatedMovies/HighRatedMovies"

const Home = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  //TODO use info
  const { username } = useSelector((state: any) => state.user.userInfo)

  // //TODO add a function "new from friends"

  return (
    <>
      <Row>
        <HighRatedMovies big={true} />
      </Row>
      <Row>
        <PopularMovies />
      </Row>
    </>
  )
}

export default Home
