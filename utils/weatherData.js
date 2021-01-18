const constants = require('../config')
const request = require('request')

const weatherData = (address,callback)=>{
    const url = constants.weatherApi.Base_URL+constants.weatherApi.key+"&q="+encodeURIComponent(address);
    request({url, json:true},(error,{body})=>{
        // console.log(url);
        if(error){
            callback("can't fetch this url",undefined)
        }else if(!body.temp_c || !body.current.condition.icon || !body.current.condition.text || !body.location.name){
            callback("Unable to find required data, try another location", undefined);
        }
        else{
            // console.log(body.current.temp_c);
            callback(undefined, {
                "temperature":body.current.temp_c,
                "description":body.current.condition.text,
                "cityName":body.location.name,
                "icon":body.current.condition.icon
            })
        }
    })
}

module.exports = weatherData