import axios from "axios"

const { REACT_APP_LOCAL_SERVER } = process.env
export const register = async (data: object) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }
  try {
    const response = await axios.post(
      `${REACT_APP_LOCAL_SERVER}/api/users/register`,
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
