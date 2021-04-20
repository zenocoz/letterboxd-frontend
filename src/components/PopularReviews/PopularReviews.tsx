import { useState, useEffect } from "react"
import Review from "../Review/Review"
import { API } from "../../API"
import "./PopularReviews.css"

const PopularReviews = () => {
  const [reviews, setReviews] = useState([])

  const getPopularReviews = async () => {
    const reviews = await API.getAllReviews()
    setReviews(reviews)
  }
  useEffect(() => {
    getPopularReviews()
  }, [])

  return (
    <div className="popular-reviews">
      {reviews.length > 0 && reviews.map((review) => <Review {...review} />)}
    </div>
  )
}

export default PopularReviews
