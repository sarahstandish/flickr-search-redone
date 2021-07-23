import { flickrSearchCall } from "./models/flickrSearchCall";

const recordCall = numberOfCalls => {
    let newCall = {
        dateTime: Date.now(),
        calls: numberOfCalls
    }

    flickrSearchCall.create(newCall, (err, newRecord) => {
        if (err) console.log(err);
        else console.log(newRecord)
    })
}

export default recordCall;