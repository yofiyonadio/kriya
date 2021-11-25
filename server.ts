import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import history from 'connect-history-api-fallback'
import session from 'express-session'

import { Routes, Database, Logger, Color, Middleware } from './registry'

config()

const app = express()
const port = process.env.APP_PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}))

app.use((req, res, next) => {
  Middleware.default(req, res, next)
});

Routes.route(app)

const staticPath = express.static(__dirname + '/public')
app.use(staticPath)
app.use(history({
  disableDotRule: true,
  verbose: true,
}))
app.use(staticPath)

app.listen(port, async () => {
  await Database.init()
    .then(() => {
      Logger.log('-------- (Kriya Backend Technical Test) server started on: --------', Color.pink)
      Logger.log('------------------ http://localhost:' + port + process.env.APP_API_URL + ' -----------------', Color.green)
    })

})