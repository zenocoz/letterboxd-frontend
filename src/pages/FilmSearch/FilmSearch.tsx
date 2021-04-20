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

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-between">
          <div className="d-flex">
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
          </div>
          <div>
            <Form inline>
              <FormControl
                type="text"
                className="mr-sm-2 search-bar-inner"
                // value={value}
                // onChange={handleSearch}
              />
            </Form>
          </div>
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
      <HighRatedMovies big={true} limit={4} />
      <Banner />
      <PopularMovies />
      <HighRatedMovies big={false} limit={12} />
      <Row>
        <Col md={8}>
          <PopularReviews />
        </Col>
        <Col sm={12} md={4}>
          <PopularMembers />
        </Col>
      </Row>
    </>
  )
}

export default FilmSearch
