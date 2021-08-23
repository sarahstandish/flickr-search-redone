import React from 'react'

function FormComponents( props ) {

    // hide dpi search component if calls per hour have exceeded 3600 (maximum set by Flickr)
    let dpiVisibility = props.callsThisHour > 3600 ? "dpiSearchInvisible" : "dpiSearchVisible"
    
    return(
        
        <form>
            <h2>Flickr Search</h2>
            <label>Search term</label>
                <input 
                    type="text" 
                    name="search_term" 
                    placeholder="Looking for photos of..." 
                    value={props.search_term} 
                    onChange={props.handleChange}
                    required
                />

            <label>City</label>
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Photos taken in or around..." 
                    value={props.location} 
                    onChange={props.handleChange} 
                />
                
            <label>Licenses</label>
                <p className="explanation">Default selection: images licensed for commercial use and modifications</p>
                <div className='licenses'>

                <label className="container">All Rights Reserved
                    <input 
                        type='checkbox' 
                        name="0" 
                        value="0" 
                        checked={props.props.licenses[0]} 
                        onChange={props.handleChange} 
                    />
                    <span className="checkmark"></span>
                </label>
                
                <label 
                    className="container">Attribution-NonCommercial-ShareAlike License  
                    <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox'  
                        name="1" value="1" 
                        checked={props.props.licenses[1]}
                        onChange={props.handleChange}
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="container">Attribution-NonCommercial License  
                    <a href="https://creativecommons.org/licenses/by-nc/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="2" value="2" 
                        checked={props.props.licenses[2]}
                        onChange={props.handleChange}
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="container">Attribution-NonCommercial-NoDerivs License  
                    <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="3" value="3" 
                        checked={props.props.licenses[3]}
                        onChange={props.handleChange}
                        />
                    <span className="checkmark"></span>
                </label>

                <label className="container">Attribution License  
                    <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="4" value="4"
                        checked={props.props.licenses[4]} 
                        onChange={props.handleChange}
                    />  
                    <span className="checkmark"></span>
                </label>

                <label className="container">Attribution-ShareAlike License  
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="5" value="5" 
                        checked={props.props.licenses[5]}
                        onChange={props.handleChange}
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="container">Attribution-NoDerivs License  <a href="https://creativecommons.org/licenses/by-nd/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                    type='checkbox' 
                    name="6" value="6" 
                    checked={props.props.licenses[6]}
                    onChange={props.handleChange}
                    />  
                    <span className="checkmark"></span>
                </label>

                <label className="container">No known copyright restrictions  <a href="https://www.flickr.com/commons/usage/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="7" value="7" 
                        checked={props.props.licenses[7]}
                        onChange={props.handleChange}
                    />  
                    <span className="checkmark"></span>
                </label>

                <label className="container">United States Government Work  
                    <a href="http://www.usa.gov/copyright.shtml" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="8" value="8" 
                        checked={props.props.licenses[8]}
                        onChange={props.handleChange}
                    />  
                    <span className="checkmark"></span>
                </label>

                <label className="container">Public Domain Dedication (CC0)  
                    <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="9" value="9" 
                        checked={props.props.licenses[9]}
                        onChange={props.handleChange}
                        />  
                    <span className="checkmark"></span>
                </label>

            <label className="container">Public Domain Mark  
                <a href="https://creativecommons.org/publicdomain/mark/1.0/" target="_blank" rel="noreferrer">     Learn more</a>
                <input 
                    type='checkbox' 
                    name="10" value="10" 
                    checked={props.props.licenses[10]}
                    onChange={props.handleChange}
                />  
                <span className="checkmark"></span>
            </label>

            </div>
            <div className = {dpiVisibility}>
                <label>Minimum DPI</label>
                    <input 
                        type="number" 
                        name="dpi" 
                        value={props.dpi} 
                        onChange={props.handleChange}
                    />
            </div>
            <button>Submit</button>
        </form>
    )
}

export default FormComponents;

