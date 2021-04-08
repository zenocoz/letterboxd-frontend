import React from "react"

import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import "./SearchResults.css"

const SearchResults = () => {
  const history = useHistory()
  const { movieList } = useSelector((state: any) => state.search)

  return (
    <div className="results">
      <ul>
        {movieList.length > 0 &&
          movieList.map((movie: any) => (
            <li
              onClick={() => {
                history.push(`/film/${movie.imdbID}`)
              }}
            >
              {movie.Title}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SearchResults
