/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

function ApiCallTracker( props ) {

    console.log("test change")

    let percentage = (props.props.thisHour / 3600 * 100).toFixed(0)

    let warning;

    if (percentage < 50) {
        warning = `API calls this hour are at ${percentage}% of the hourly limit.`
    } else if (percentage < 80) {
        warning = `API calls this hour are at ${percentage}% of the hourly limit.\nTip: searching with DPI performs many more API calls, so search without it unless needed.`
    } else if (percentage < 100) {
        warning = `API calls this hour are at ${percentage}% of the hourly limit.\nAfter the limit is exceeded, DPI search will be temporarily disabled.`
    } else {
        warning = `API calls this hour are over the hourly limit and DPI search has been disabled.\nCheck back later to search with DPI again.`
    }

    return(
            <div className="error">
                <p>{warning}</p>
            </div>

    )
}

export default ApiCallTracker;