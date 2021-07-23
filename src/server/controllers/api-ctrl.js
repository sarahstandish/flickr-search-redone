const flickrSearchCall = require('../models/flickrSearchCall')

const newCall = (req, res) => {

    let body = {
        "dateTime": Date.now(),
        "calls": req.body.calls
    }

    const searchCall = new flickrSearchCall(body);

    console.log(body)

    if (!req.body) {
        return res.status(500).json({
            success: false,
            error: "No content provided"
        })
    }


    if (!searchCall) {
        return res.status(400).json(
            {
                success: false,
                error: "Error, searchCall empty"
            })
    }

    searchCall
        .save()
        .then(() => {
            return res.status(201)
                .json({
                    success: true,
                    id: searchCall._id,
                    message: "Call posted"
                })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Calls not posted"
            })
        })
}

const getCalls = async (req, res) => {
    await flickrSearchCall
        .find({}, (err, calls) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }

            if (!calls.length) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        error: "Information not found"
                    })
            }

            return res.status(200).json({
                success: true,
                data: calls
            })
        })
        .catch(err => console.log(err))
}

module.exports = {
    newCall,
    getCalls
}