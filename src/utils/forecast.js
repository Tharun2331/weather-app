const request = require('postman-request');

const forecast = (latitude,longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f0837b42fe93fa22b2ca8cdf48678390&query=' + latitude + ',' + longitude + '&units=f' 

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })


}

module.exports = forecast