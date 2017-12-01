// ----------------------------------------------------------------------------

// npm
const http = require('http')
const path = require('path')

// npm
const express = require('express')
const pug = require('pug')
const morgan = require('morgan')
const favicon = require('serve-favicon')

// ----------------------------------------------------------------------------
// setup

const example = {
  'starter-template' : true,
  'grid' : true,
  'jumbotron' : true,
  'narrow-jumbotron' : true,
  'navbar' : true,
  'navbar-top' : true,
  'navbar-top-fixed' : true,
  'navbar-bottom' : true,
}

var sendFileOptions = {
  root: path.join(__dirname, 'views'),
}

// ----------------------------------------------------------------------------
// application

const app = express()
app.set('view engine', 'pug')
app.enable('strict routing')
app.enable('case sensitive routing')
app.disable('x-powered-by')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static('public'))

app.use(morgan())

app.use((req, res, next) => {
  res.locals.title = 'Pug Bootstrap'
  next()
})

app.get("/", (req, res) => {
  res.render('index')
})

app.get("/:name", (req, res) => {
  if ( req.params.name in example ) {
    res.render(req.params.name)
  }
  else {
    res.set('Content-Type', 'text/plain')
    res.status(404).send('404 - Not Found\n')    
  }
})

app.get("/template/:name", (req, res, next) => {
  if ( req.params.name in example ) {
    const fileName = req.params.name + '.pug'
    res.set('Content-Type', 'text/plain')
    res.sendFile(fileName, sendFileOptions, (err) => {
      if (err) return next(err)
    })
  }
  else {
    res.set('Content-Type', 'text/plain')
    res.status(404).send('404 - Not Found\n')    
  }
})

// ----------------------------------------------------------------------------
// server

// listen for requests
const port = process.env.PORT
const server = http.createServer()
server.on('request', app)
server.listen(port, () => {
  console.log('Your app is listening on port ' + port)
})

// ----------------------------------------------------------------------------
