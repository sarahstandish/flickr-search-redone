import React, { useState, useEffect } from 'react';
import FormComponents from './FormComponents';
import { hasMinDPI, getLatAndLang, createUrl} from './flickrSearchHelperFunctions'
import Photo from './Photo'
import ApiCallTracker from './ApiCallTracker';
import api from '../api'


function FormContainer() {

    // state containing form input
    const [ input, setInput ] = useState({
        search_term: "",
        licenses: {
            0: false,
            1: false,
            2: false,
            3: false,
            4: true,
            5: true,
            6: false,
            7: true,
            8: true,
            9: true,
            10: true
        },
        dpi: "",
        location: ""
    })

    // photos returned by search
    const [ photosArray, setPhotosArray ] = useState([]);

    // error messages
    const [ errorMessages, setErrorMessages ] = useState({
        searchError: "",
        locationError: "",
    })

    // api calls
    const [ apiCalls, setApiCalls ] = useState({
        thisSession: 0,
        thisHour: 0
    })

    // get api calls this hour from database on initial render, use it to set total api calls in state

    useEffect(() => {

        let callsThisHour = 0
        let millisecondsLastHour = Date.now() - 3600000 // milliseconds that occurred in the last hour

        api.getCalls()
            .then(object => {

                console.log("Got calls")

                // take only the last 100 calls since each entry must be at least 1% of the total capacity
                let lastHundred = object.data.data.slice(-100).reverse()
                
                for (const element of lastHundred) {
                    if (element.dateTime >= millisecondsLastHour) {
                        callsThisHour += element.calls
                        console.log("Calls so far: ", callsThisHour)
                    } else {
                        // set calls this hour and jump out of the loop
                        // all further entries will be too far in the past to be relevant
                        setApiCalls(prevState => {
                            return {
                                ...prevState,
                                thisHour: callsThisHour
                            }
                        })
                        console.log("Calls this hour: ", apiCalls.thisHour)
                        break
                    }
                }
            })
            .catch(err => console.log("Error: ", err))

    }, [])

        // write the apiCalls to the database
    useEffect(() => { 

        console.log("This session total changing")

        // only run if calls are greater than or 1% of limit
        if (apiCalls.thisSession > 36) {
            api.newCall({ "calls" : apiCalls.thisSession })
            .then(console.log(`${apiCalls.thisSession} calls inserted successfully`))
            .then(setApiCalls(prevState => {
                return {
                    ...prevState,
                    thisSession: 0
                }

            })) // reset apiCalls to zero
            .catch(err => {
                console.log(err)            
                })
        } 

    }, [apiCalls.thisSession])

    // handle form changes
    function handleChange(event) {
        const { name, value, type, checked } = event.target

        //handle checkbox change
        if (type === "checkbox") {
            setInput({
                ...input,
                licenses: {
                    ...input.licenses,
                    [name]: checked
                }
            })
        } else { // handle all other changes
            setInput({
                ...input,
                [name]: value
            })
        }        
    }

    // fetch photos from flickr; function to run in onSubmit
    const fetchPhotos = async () => {

        let [ latitude , longitude ] = await getLatAndLang(input.location); // get latitude and longitude, returned as array 

        if (input.location && latitude === '%00') {
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
        
        let flickr_url = await createUrl(input, latitude, longitude) // create the url for the get request

        let photosArray = await fetch(flickr_url) // make call to flickr
        .then(response => {
            if (response.ok) {
                setApiCalls(prevState => {
                    return {
                        thisHour: prevState.thisHour + 1,
                        thisSession: prevState.thisSession + 1
                    }
                })
                return response.json();
            }
            // handle bad request
        })
        .then(data => {
            if (input.dpi) {

                setApiCalls(prevState => {
                    return {
                        thisHour: prevState.thisHour + data.photos.photo.length,
                        thisSession: prevState.thisSession + data.photos.photo.length
                    }
                })

                return Promise.all(data.photos.photo.map(photo => hasMinDPI(photo, input.dpi)))
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

    function handleSubmit(event) {
        event.preventDefault();

        fetchPhotos()
    }

    return(
        <div className="form" onSubmit={handleSubmit}>
            < FormComponents
                handleChange = {handleChange}
                props = {input}
            />
            { apiCalls.thisHour > 0 ? 
                < ApiCallTracker props = {apiCalls} />
                : null
            }
            
            <p>{errorMessages.locationError}</p>
            <p>{errorMessages.searchError}</p>
            <div className="photos">
                {photosArray}
            </div>
        </div>
        )
}

export default FormContainer;