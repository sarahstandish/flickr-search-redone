import {googleApiKey, flickrApiKey} from './keys'

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

export { hasMinDPI, getLatAndLang, createUrl}