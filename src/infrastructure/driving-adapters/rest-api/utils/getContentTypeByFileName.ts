import { extname } from "path"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

export default function getContentTypeByFileName(fileName: string) {
  const ext = extname(fileName).split(".")[1]
  console.log(ext)
  console.log(typeof ext)

  if (ext === "apng") {
    return "image/apng"
  }

  if (ext === "avif") {
    return "image/avif"
  }

  if (ext === "gif") {
    return "image/gif"
  }

  if (ext === "jpeg") {
    return "image/jpeg"
  }

  if (ext === "png") {
    return "image/png"
  }

  if (ext === "svg") {
    return "image/svg+xml"
  }

  if (ext === "webp") {
    return "image/webp"
  }

  if (ext === "ico") {
    return "image/x-icon"
  }

  if (ext === "pdf") {
    return "application/pdf"
  }

  /*  if (extension === "jpg") {
        return "image/jpeg";
    } */
  // Si fuera otro o jpg lo va a tirar con este tipo de imagen y por lo menos pal jpg funciona
  return "image/jpeg"
}
