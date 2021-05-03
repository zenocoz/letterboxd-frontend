import axios from "axios"
import { IUserData } from "./interface"

const { REACT_APP_REMOTE_SERVER } = process.env
export const register = async (data: IUserData) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }
  try {
    const response = await axios.post(
      `${REACT_APP_REMOTE_SERVER}/api/users/register`,
      data,
      config
    )

    if (response.status === 200) {
      return response.data
    } else {
      return response.data
    }
  } catch (error) {
    console.log("Error in signup fetching", error)
    console.log("error response data", error.response.data)
    return error.response.data
  }
}

export const signin = async (data: IUserData) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  }

  try {
    const response = await axios.post(
      `${REACT_APP_REMOTE_SERVER}/api/users/login`,
      data,
      config
    )

    if (response.status === 200) {
      return response.data
    } else {
      return response.data
    }
  } catch (error) {
    console.log("Error in signup fetching", error)
    console.log("error response DATA", error.response.data)
    return error.response.data
  }
}
