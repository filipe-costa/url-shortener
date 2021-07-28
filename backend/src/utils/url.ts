import {URL} from "url"

export const formatUrl = (...args: string[]) => {
  return args.join("")
}

export const isValidUrl = (uri: string) => {
  try {
    new URL(uri)
    return true
  } catch {
    return false
  }
}