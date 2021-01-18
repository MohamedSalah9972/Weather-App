const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const weatherData = require('../utils/weatherData')


const port = process.env.PORT || 3000 // local port of system and if not found let it with 3000

const staticDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(staticDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){ /// if address is undefined
        return res.send({
            error:"Please enter address in search box"
        })
    }
    
    weatherData(address,(error,{temperature,description,cityName,icon}={})=>{ /// error and body which in callback in weatherData
        if(error){
            return res.send({error})
        }
        // console.log(temperature, description, cityName,icon);
        res.send({ temperature,description,cityName});
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title: "page not found"
    })
})

app.listen(port,()=>{
    console.log("Server is up and running on port: ",port);
})
