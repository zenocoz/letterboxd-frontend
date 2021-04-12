import React from "react"
import { IMemberMiniProps } from "./interface"

const MemberMini = ({ username }: IMemberMiniProps) => {
  return (
    <div
      className="mb-2"
      style={{
        width: "100%",
        height: "10vh",
        backgroundColor: "#05c1f6",
      }}
    >
      {username}
    </div>
  )
}

export default MemberMini
