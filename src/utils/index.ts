import { IUser } from "../interface"

export const checkViews = (seenBy: IUser[], id: string) => {
  const userFound = seenBy.find((user) => user._id === id)
  if (userFound) {
    console.log(`movie seen by user: ${userFound}`)
    return true
    //   setWasSeen(true)
  } else {
    console.log("movie wasn't seen by user", userFound)
    return false
    //   setWasSeen(false)
  }
}
