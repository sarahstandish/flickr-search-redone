/* eslint-disable react-hooks/exhaustive-deps */
import {googleApiKey, flickrApiKey} from './keys'
import Photo from './Photo'
import React, { useEffect, useState } from 'react'
import api from '../api'

function GetImages( { props }) {

    const [ photosArray, setPhotosArray ] = useState([]);

    const [ errorMessages, setErrorMessages ] = useState({
        searchError: "",
        locationError: "",
    })

    const [ apiCallsThisSession, setApiCallsThisSession ] = useState(0);
    const [ apiCallsThisHour, setApiCallsThisHour ] = useState(0)


    useEffect(() => {

        console.log("Props: ", props)

        const fetchPhotos = async () => {

            let [ latitude , longitude ] = await getLatAndLang(props.location); // get latitude and longitude, returned as array 

            if (props.location && latitude === '%00') {
                setErrorMessages(prevMessages => {
                    return {
                        ...prevMessages,
                        locationError: "Your location could not be found; search completed for all locations."
                    }
                })
            } else {
                setErrorMessages(prevMessages => {
                    return {
                        ...prevMessages,
                        locationError: ""
                    }
                })
            }
            
            let flickr_url = await createUrl(props, latitude, longitude) // create the url for the get request

            let photosArray = await fetch(flickr_url) // make call to flickr
            .then(response => {
                if (response.ok) {
                    setApiCallsThisSession(prevState => prevState + 1)
                    setApiCallsThisHour(prevState => prevState + 1)
                    return response.json();
                }
                // handle bad request
            })
            .then(data => {
                if (props.dpi) {

                    setApiCallsThisSession(prevState => prevState + data.photos.photo.length)
                    setApiCallsThisHour(prevState => prevState + data.photos.photo.length)

                    return Promise.all(data.photos.photo.map(photo => hasMinDPI(photo, props.dpi)))
                        .then(result => result.filter(element => element)) // filter out undefined elements in return array
                        .catch(error => console.log("Error is: ", error))

                    } else {
                        return data.photos.photo
                    }
            })


            if (photosArray.length === 0) {
                setErrorMessages(prevMessages => {
                    return {
                        ...prevMessages,
                        searchError: "No results matched your search."
                    }
                })
            } else {
                setErrorMessages(prevMessages => {
                    return {
                        ...prevMessages,
                        searchError: ""
                    }
                })
            }

            setPhotosArray(photosArray.map(photo => <Photo key={photo.id} props={photo} /> ))
        }

        fetchPhotos()

    }, [props.submitted])

    // write the apiCalls to the database
    useEffect(() => { 

        // only run if calls are greater than or 1% of limit
        if (apiCallsThisSession > 36) {
            api.newCall({ "calls" : apiCallsThisSession })
            .then(console.log(`${apiCallsThisSession} calls inserted successfully`))
            .then(setApiCallsThisSession(0)) // reset apiCalls to zero
            .catch(err => {
                console.log(err)            
                })
        } 

    }, [apiCallsThisSession])

    // get api calls this hour from database on initial render, use it to set total api calls in state
    useEffect(() => {

        let callsThisHour = 0
        let millisecondsLastHour = Date.now() - 3600000 // milliseconds that occurred in the last hour

        api.getCalls()
            .then(object => {

                let databaseEntries = object.data.data

                // take only the last 100 calls since each entry must be at least 1% of the total capacity
                databaseEntries.slice(-100).reverse().forEach(element => {
                    if (element.dateTime >= millisecondsLastHour) {
                        callsThisHour += element.calls
                        console.log("Calls so far: ", callsThisHour)
                    } else {
                        // set calls this hour and jump out of the loop
                        // all further entries will be too far in the past to be relevant
                        setApiCallsThisHour(callsThisHour)
                        return
                    }
                })

            })
            .catch(err => console.log("Error: ", err))
    }, [])

    return(
        <div>
            <div className="error">
                <p>API calls this hour: {apiCallsThisHour}</p>
                <p>API Calls this hour are at {(apiCallsThisHour / 3600 * 100).toFixed(0)}% of the hourly limit.</p>
                <p>{errorMessages.locationError}</p>
                <p>{errorMessages.searchError}</p>
            </div>
            <div className="photos">
                {photosArray}
            </div>
        </div>
    )
}

async function createUrl(props, latitude, longitude) {

    let licenses = licensesToString(props.licenses);

    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&text=${props.search_term}&content_type=1&per_page=250&format=json&nojsoncallback=1&sort=relevance&radius=32&lat=${latitude}&lon=${longitude}&license=${licenses}`
}

function licensesToString(licenseObject) {
    //filter so only selected (true) license numbers are included
    let selectedLicenses = Object.keys(licenseObject).filter(license => licenseObject[license])

    //return selected licenses as a string joined by commas
   return selectedLicenses.join(",")
}

async function getLatAndLang(location) {

    if (!location) {
        return ['%00', '%00']
    } else {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`
        
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return [data.results[0].geometry.bounds.northeast.lat, data.results[0].geometry.bounds.northeast.lng]
            })
            .catch(() => ['%00', '%00']) // return empty location coordinates if error
    }
}

async function hasMinDPI(photo, dpi) {

    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=${flickrApiKey}&photo_id=${photo.id}&secret=${photo.secret}&format=json&nojsoncallback=1`;
    
    return fetch(url)
        .then(response => response.json())
        .then(response => { // if has exif data, has x-resolution, and x-resolution is greater than or equal to min dpi
            if ((Object.keys(response.photo).includes('exif')) && ((response.photo.exif.some(element => (Object.values(element).includes('X-Resolution') && parseInt(element.raw._content) >= dpi))))) {
                    return photo;
                }
        })
        .catch(() => null) // return null if error
}

export default GetImages;