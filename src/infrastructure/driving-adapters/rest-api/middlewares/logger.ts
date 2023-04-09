import http from "http"
import { NextFunction, Request, Response } from "express"

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const newDate = new Date()
  const requestStart = newDate.getTime()
  let body: Uint8Array[] = []
  let assembledBody = ""
  let requestErrorMessage: string | null = null

  const getChunk = (chunk: any) => body.push(chunk)
  const assembleBody = () => {
    assembledBody = Buffer.concat(body).toString()
  }
  const getError = (error: Error) => {
    requestErrorMessage = error.message
  }
  req.on("data", getChunk)
  req.on("end", assembleBody)
  req.on("error", getError)

  const logClose = () => {
    removeHandlers()
    log(req, res, "Client aborted.", requestStart, assembledBody)
  }
  const logError = (error: Error) => {
    removeHandlers()
    log(req, res, error.message, requestStart, assembledBody)
  }
  const logFinish = () => {
    removeHandlers()
    log(req, res, requestErrorMessage, requestStart, assembledBody)
  }
  res.on("close", logClose)
  res.on("error", logError)
  res.on("finish", logFinish)

  const removeHandlers = () => {
    req.off("data", getChunk)
    req.off("end", assembleBody)
    req.off("error", getError)
    res.off("close", logClose)
    res.off("error", logError)
    res.off("finish", logFinish)
  }

  next()
}

const log = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
  },
  errorMessage: string | null,
  requestStart: number,
  body: string
) => {
  const request2: any = request
  const { rawHeaders, httpVersion, method, socket, url } = request
  const { remoteAddress, remoteFamily } = socket

  const { statusCode, statusMessage } = response
  const headers = response.getHeaders()

  console.log(
    "########################################## LOG ##########################################"
  )
  console.log({
    // timestamp: Date.now(),
    // processingTime: Date.now() - requestStart,
    // rawHeaders,
    // body,
    errorMessage,
    // httpVersion,
    method,
    // remoteAddress,
    // remoteFamily,
    // url,
    endpoint: request2._parsedOriginalUrl.pathname,
    /*  response: {
      statusCode,
      statusMessage,
      headers,
    }, */
  })
}
