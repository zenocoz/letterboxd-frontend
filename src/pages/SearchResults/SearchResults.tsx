import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearSearchResults } from "../../store/search/reducer"
import { useSelector } from "react-redux"
import "./SearchResults.css"
import { Row, Col } from "react-bootstrap"
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall"
import PopularReviews from "../../components/PopularReviews/PopularReviews"

const SearchResults = () => {
  // const history = useHistory()
  const { movieList } = useSelector((state: any) => state.search)
  const dispatch = useDispatch()

  //clean search after unmounting
  useEffect((): any => {
    return () => {
      dispatch(clearSearchResults())
    }
  }, [])

  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          {movieList.length > 0 &&
            movieList.map((movie: any) => (
              <MovieCardSmall {...movie} withInfo={true} />
            ))}
        </Col>
        <Col xs={12} md={4} style={{ paddingRight: 0 }}>
          <div className="mt-5">
            <PopularReviews />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default SearchResults
