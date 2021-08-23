/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

function ApiCallTracker( props ) {

    console.log("props: ", props )

    return(
            <div className="error">
                <p>API calls this hour: {props.props.thisHour}</p>
                <p>API Calls this hour are at {(props.props.thisHour / 3600 * 100).toFixed(0)}% of the hourly limit.</p>
            </div>

    )
}

export default ApiCallTracker;