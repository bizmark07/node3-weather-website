// builtin modules
const path = require('path')

// npm modules
const express = require('express')
const hbs = require('hbs')

// local modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Initiate express 
const app = express()

// Set port based on OS environmental variable
const port = process.env.PORT || 3000

// define paths for express configuraiton
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luke Sawyer'
    })
})

app.get('/about', (req, res) => {
    res.render('about',  {
        title: 'About Me',
        name: 'Luke Sawyer'
    })
})

app.get('/help', (req, res) => {
    res.render('help',  {
        message: 'This is the weather app help page',
        title: "Help",
        name: 'Luke Sawyer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }= {} ) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})   
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
                })
            
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page not found',
        message: 'This help page not found',
        name: 'Luke Sawyer'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 page not found',
        name: 'Luke Sawyer'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})