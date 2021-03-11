const path = require("path")
const express = require("express")
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require("postman-request")
const port = process.env.PORT || 3000
const app = express()
// define paths for express config
const public = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// setup static directory to serve
app.use(express.static(public))

app.get('/',(req,res)=> {
    res.render('index',{
        title:"Weather",
        name:"tharun"
    })
})
app.get('/products',(req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
       products: []
    })
})




app.get('/about',(req,res)=> {
    res.render('about',{
        title:"About",
        name:"tharun"
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:"Help",
        name:"tharun"
    })
})


 app.get("/weather",(req,res) => {
   if(!req.query.address) {
      return  res.send({
         error: 'You must provide search term'
       })
   }

   geocode(req.query.address,(error, {latitude,longitude,location}= {}) => {
     if(error) {
         return res.send({error})
     }
     forecast(latitude,longitude,(error,forecastData) => {
         if(error) {
             return res.send({error})
         }
         res.send({
             forecast: forecastData,
             location,
             address:req.query.address
         })
     })
   })
 })

app.get('/help/*',(req,res) => {
    res.render('404', {
        title:'404',
        name:'tharun',
        errorMessage:'help article not found'
    })
})


 app.get('*',(req,res) => {
     res.render('404',{
         title:'404',
         name:'Tharun',
         errorMessage:'Page not found'
     })
 })

app.listen(port, ()=> {
    console.log("server is running successfully on port" + port)
})