const mid = (req, res, next) => {

    req.text = "some text here"
    console.log("Send middleware")
    next()
}


module.exports = { mid }