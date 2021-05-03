import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { getUserInfo } from "../../store/user/reducer"

import "./Home.css"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import HighRatedMovies from "../../components/HighRatedMovies/HighRatedMovies"

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  return (
    <>
      <div id="movies-row" className="mt-5">
        <HighRatedMovies big={true} limit={4} />
      </div>
      <PopularMovies />
    </>
  )
}

export default Home
