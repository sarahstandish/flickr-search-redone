import React from 'react';

function Photo({ props }) {

    let flickr_url = `https://www.flickr.com/photos/${props.owner}/${props.id}`
    let photo_url = `https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_n.jpg`

    return(
        <a href={flickr_url} target='_blank' rel="noreferrer">
            <img src={photo_url} alt={props.title}/>
        </a>
    )
}

export default Photo;