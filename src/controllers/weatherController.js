let axios = require("axios")

const getCities = async function(req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let citiObjArray = []
        for (let i = 0; i < cities.length; i++) {
            let obj = { city: cities[i] }
            let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=0c4ca8c2445d8b6eb1a415b2519e3bf6`)
            console.log(result.data.main.temp)

            obj.temp = result.data.main.temp
            citiObjArray.push(obj)


        }
        res.send({ status: true, data: citiObjArray })

        let sorted = citiObjArray.sort(function(a, b) { return b.temp - a.temp })
        console.log(sorted)
        res.status(200).send({ status: true, data: sorted })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "server error" })
    }
}


let memes = async function(req, res) {
    try {
        let template_id = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
        }
        let result = await axios(options)
        res.status(200).send({ data: result.data })
    } catch (error) {
        res.status(500).send({ status: false, msg: "server error" })
    }
}

module.exports.getCities = getCities
module.exports.memes = memes