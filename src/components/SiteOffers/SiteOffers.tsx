import "./SiteOffers.css"
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
    <div className="row site-offers ">
      <div className="col  " style={{ paddingRight: 0, paddingLeft: 0 }}>
        <div className="row mr-0 ml-0">
          <div className="col sm-12 md-6  _panel">
            <div
              className="mt-2 panel"
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
          </div>
          <div className="col sm-12 md-6 _panel">
            <div
              className="mt-2 panel"
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
          </div>
          <div className="col sm-12 md-6 _panel">
            <div
              className="mt-2 panel"
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
          </div>
        </div>
        <div className="row mr-0 ml-0">
          <div className="col sm-12 md-6 _panel">
            <div
              className="mt-2 panel"
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
          </div>
          <div className="col sm-12 md-6 _panel">
            <div
              className="mt-2 panel"
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
          </div>
          <div className="col sm-12 md-6 _panel">
            <div
              className="mt-2 panel"
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteOffers
