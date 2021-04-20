import { IReviewProps } from "./interface"

const Review = ({ text }: IReviewProps) => {
  return (
    <div
      className="mb-2"
      style={{
        width: "100%",
        height: "30vh",
        backgroundColor: "#e68eb5",
      }}
    >
      {text}
    </div>
  )
}

export default Review
