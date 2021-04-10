import React from "react"
import "./SiteOffers.css"
import { Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEye,
  faStar,
  faAlignLeft,
  faHeart,
  faCalendar,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons"

const SiteOffers = () => {
  return (
    <Row className="site-offers ">
      <Col>
        <Row>
          <Col>
            <div
              className="mt-2"
              style={{
                width: "100%",
                height: "6rem",
                backgroundColor: "#848b99",
              }}
            >
              <div className="inner-items">
                <FontAwesomeIcon icon={faEye} size="3x" className="mr-3" />

                <p>
                  Keep track of every film you've ever watched (or just start
                  from the day you join)
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div
              className="mt-2"
              style={{
                width: "100%",
                height: "6rem",
                backgroundColor: "#848b99",
              }}
            >
              <div className="inner-items">
                <FontAwesomeIcon icon={faHeart} size="3x" className="mr-3" />

                <p>
                  Show some love for your favorite films, lists and reviews with
                  a “like”
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div
              className="mt-2"
              style={{
                width: "100%",
                height: "6rem",
                backgroundColor: "#848b99",
              }}
            >
              <div className="inner-items">
                <FontAwesomeIcon
                  icon={faAlignLeft}
                  size="3x"
                  className="mr-3"
                />

                <p>
                  Write and share reviews, and follow friends and other members
                  to read theirs
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className="mt-2"
              style={{
                width: "100%",
                height: "6rem",
                backgroundColor: "#848b99",
              }}
            >
              <div className="inner-items">
                <FontAwesomeIcon icon={faStar} size="3x" className="mr-3" />

                <p>
                  Rate each film on a five-star scale (with halves) to record
                  and share your reaction
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div
              className="mt-2"
              style={{
                width: "100%",
                height: "6rem",
                backgroundColor: "#848b99",
              }}
            >
              <div className="inner-items">
                <FontAwesomeIcon icon={faCalendar} size="3x" className="mr-3" />

                <p>Keep a diary of your film watching (and upgrade to</p>
              </div>
            </div>
          </Col>
          <Col>
            <div
              className="mt-2"
              style={{
                width: "100%",
                height: "6rem",
                backgroundColor: "#848b99",
              }}
            >
              <div className="inner-items">
                <FontAwesomeIcon icon={faThLarge} size="3x" className="mr-3" />

                <p>
                  Compile and share lists of films on any topic and keep a
                  watchlist of films to see
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default SiteOffers

// <div className="site-offers d-flex">

//     </div>
