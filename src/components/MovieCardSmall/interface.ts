export interface IMovieCardSmallProps {
  _id: string
  Poster: string
  imdbID: string
  withInfo: boolean
  Title: string
  Year: string
  Director: string
  loggedIn: boolean
  onMouseLeave: any
  onMouseEnter: any
  hovered: boolean
  club: boolean
  clubId?: string | any
  memberId?: string | any
  chooser?: boolean
}
