type Endpoint = {
  url: string
  method: "post" | "get" | "put" | "patch" | "delete"
}

const baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000"

export const checkUserEndpoint: Endpoint = {
  url: `${baseUrl}/check`,
  method: "post",
}

export const createUserEndpoint: Endpoint = {
  url: `${baseUrl}/user`,
  method: "post",
}
