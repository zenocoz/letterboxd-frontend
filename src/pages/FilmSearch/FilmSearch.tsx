import React, { useEffect, useState } from "react"
import "./FilmSearch.css"
import Banner from "../../components/Banner/Banner"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import PopularReviews from "../../components/PopularReviews/PopularReviews"
import PopularMembers from "../../components/PopularMembers/PopularMembers"
import { IMovie } from "../../interface"
import MovieCardBig from "../../components/MovieCardBig/MovieCardBig"
import { API } from "../../API"

import {
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap"
import HighRatedMovies from "../../components/HighRatedMovies/HighRatedMovies"
import Review from "../../components/Review/Review"

const FilmSearch = () => {
  // const [movies, setMovies] = useState<Array<IMovie>>([])
  const [reviews, setReviews] = useState([])

  // const findHighRatedMovies = async () => {
  //   const movieData = await API.getAllMoviesData()
  //   const sortedByRating = await movieData.sort(function (a: any, b: any) {
  //     if (a.rating < b.rating) {
  //       return 1
  //     } else {
  //       return -1
  //     }
  //   })

  //   const retrievedMovies: Array<Promise<IMovie>> = []
  //   sortedByRating.slice(0, 4).forEach((sorted: any) => {
  //     let movie: Promise<IMovie> = API.getMoviesByImdbId(sorted.imdbID)
  //     retrievedMovies.push(movie)
  //   })

  //   Promise.all(retrievedMovies).then((values) => {
  //     console.log(values)
  //     setMovies(values)
  //   })
  // }

  const getPopularReviews = async () => {
    const reviews = await API.getAllReviews()
    setReviews(reviews)
  }
  useEffect(() => {
    // findHighRatedMovies()
    getPopularReviews()
  }, [])

  return (
    <>
      <Row>
        <Col className="d-flex">
          <DropdownButton
            className="film-buttons"
            id="dropdown-item-button"
            title="Year"
          >
            <Dropdown.Item as="button">All</Dropdown.Item>
            <Dropdown.Item as="button">2020s</Dropdown.Item>
            <Dropdown.Item as="button">2010s</Dropdown.Item>
            <Dropdown.Item as="button">2000s</Dropdown.Item>
            <Dropdown.Item as="button">1990s</Dropdown.Item>
            <Dropdown.Item as="button">1980s</Dropdown.Item>
            <Dropdown.Item as="button">1970s</Dropdown.Item>
            <Dropdown.Item as="button">1960s</Dropdown.Item>
            <Dropdown.Item as="button">1950s</Dropdown.Item>
            <Dropdown.Item as="button">1940s</Dropdown.Item>
            <Dropdown.Item as="button">1930s</Dropdown.Item>
            <Dropdown.Item as="button">1920s</Dropdown.Item>
            <Dropdown.Item as="button">1910s</Dropdown.Item>
            <Dropdown.Item as="button">1900s</Dropdown.Item>
            <Dropdown.Item as="button">1890s</Dropdown.Item>
            <Dropdown.Item as="button">1880s</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-item-button" title="Rating">
            <Dropdown.Item as="button">Action</Dropdown.Item>
            <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-item-button" title="Popular">
            <Dropdown.Item as="button">Action</Dropdown.Item>
            <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-item-button" title="Genre">
            <Dropdown.Item as="button">Action</Dropdown.Item>
            <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-item-button" title="Service">
            <Dropdown.Item as="button">Action</Dropdown.Item>
            <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item>
          </DropdownButton>
          <Form inline>
            <FormControl
              type="text"
              className="mr-sm-2 search-bar"
              // value={value}
              // onChange={handleSearch}
            />
          </Form>
          {/* <div
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#445566",
                color: "#ffff",
              }}
            >
              search
            </div> */}
        </Col>
      </Row>
      <Row>
        <HighRatedMovies big={true} limit={4} />
      </Row>
      <Banner />
      <Row>
        <PopularMovies />
      </Row>
      <Row>
        <HighRatedMovies big={false} limit={12} />
      </Row>
      <Row>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <Col sm={12} md={8}>
              <Review {...review} />
            </Col>
          ))}
        {/* <Col sm={12} md={8}>
         
          <PopularReviews />
        </Col> */}
        <Col sm={12} md={4}>
          <PopularMembers />
        </Col>
      </Row>
    </>
  )
}

export default FilmSearch
