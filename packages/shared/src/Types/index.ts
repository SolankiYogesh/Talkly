export type UserType = {
  first_name: string
  last_name: string
  email: string
  picture: string | null
}
export type ResponseTypeAXIOS<T> = {
  status: number
  data: T
}
