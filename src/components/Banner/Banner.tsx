import React from "react"
import "./Banner.css"

const Banner = () => {
  return (
    <div className="row mb-5 mt-3" style={{ marginRight: 0, marginLeft: 0 }}>
      <div
        className=" col sm-12 banner d-flex"
        style={{ paddingRight: 0, paddingLeft: 0 }}
      >
        <img
          style={{ width: "100%" }}
          src="https://a.ltrbxd.com/resized/sm/upload/n5/cj/o7/fk/pod18-950-0-950-0-0.jpg?k=ae4a8547fa"
          // srcSet="https://a.ltrbxd.com/sm/upload/n5/cj/o7/fk/pod18-950.jpg?k=eeba0b2fbc 2x"
          // width="950"
          // height="8rem"
          alt="banner-image"
        />
      </div>
    </div>
  )
}

export default Banner
