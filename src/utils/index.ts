import { IUser } from "../interface"

//checks into movie array
export const checkViews = (seenBy: IUser[], id: string) => {
  if (seenBy.length > 0) {
    const userFound = seenBy.find((user) => user._id === id)
    if (userFound) {
      console.log(`movie seen by user: ${userFound}`)
      return true
    } else {
      console.log("movie wasn't seen by user", userFound)
      return false
    }
  } else {
    return false
  }
}
