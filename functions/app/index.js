/* Express App */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import customLogger from '../utils/logger'

export default function expressApp(fnName) {
  const app = express()
  const router = express.Router()

  // gzip responses
  router.use(compression)

  // Set router base path for local dev
  const routerBasePath =
    process.env.NODE_ENV === 'dev'
      ? `/${fnName}`
      : `/.netlify/functions/${fnName}/`

  router.get('/hello/', function(req, res) {
    res.send('hello world')
  })

  // Attach logger
  app.use(morgan(customLogger))

  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(cors())
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  return app
}
