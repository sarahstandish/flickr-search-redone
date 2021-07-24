import React, { useState } from 'react';
import GetImages from './GetImages'
// import Photo from './Photo'

function Form() {

    const [submitted, setSubmit ] = useState(false)
   
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
        location: "",
        submitted: 0
    })

    // const [ photosArray, setPhotosArray ] = useState([])

    // const [ messages, setMessages ] = useState({
    //     searchError: "",
    //     loctionError: ""
    // })

    // const renderCount = useRef(0);

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


    function handleSubmit(event) {
        event.preventDefault();
        setInput(prevState => {
            return {
                ...input,
                submitted: prevState.submitted + 1
            }
        } )
        setSubmit(true)
    }

    return(
        <div className="form" onSubmit={handleSubmit}>
            <h2>Flickr Search</h2>
            <form>
                <label>Search term</label>
                    <input 
                        type="text" 
                        name="search_term" 
                        placeholder="Looking for photos of..." 
                        value={input.search_term} 
                        onChange={handleChange}
                        required
                    />

                 <label>City</label>
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="Photos taken in or around..." 
                        value={input.location} 
                        onChange={handleChange} 
                    />
                    {/*<span class="error"><?php echo $location_error; ?></span>*/}
                    
                <label>Licenses</label>
                    <p className="explanation">Default selection: images licensed for commercial use and modifications</p>
                    <div className='licenses'>

                    <label className="container">All Rights Reserved
                        <input 
                            type='checkbox' 
                            name="0" 
                            value="0" 
                            checked={input.licenses[0]} 
                            onChange={handleChange} 
                        />
                        <span className="checkmark"></span>
                    </label>
                    
                    <label 
                        className="container">Attribution-NonCommercial-ShareAlike License  
                        <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox'  
                            name="1" value="1" 
                            checked={input.licenses[1]}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">Attribution-NonCommercial License  
                        <a href="https://creativecommons.org/licenses/by-nc/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox' 
                            name="2" value="2" 
                            checked={input.licenses[2]}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">Attribution-NonCommercial-NoDerivs License  
                        <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox' 
                            name="3" value="3" 
                            checked={input.licenses[3]}
                            onChange={handleChange}
                            />
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">Attribution License  
                        <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox' 
                            name="4" value="4"
                            checked={input.licenses[4]} 
                            onChange={handleChange}
                        />  
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">Attribution-ShareAlike License  
                        <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox' 
                            name="5" value="5" 
                            checked={input.licenses[5]}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">Attribution-NoDerivs License  <a href="https://creativecommons.org/licenses/by-nd/2.0/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                        type='checkbox' 
                        name="6" value="6" 
                        checked={input.licenses[6]}
                        onChange={handleChange}
                        />  
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">No known copyright restrictions  <a href="https://www.flickr.com/commons/usage/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox' 
                            name="7" value="7" 
                            checked={input.licenses[7]}
                            onChange={handleChange}
                        />  
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">United States Government Work  
                        <a href="http://www.usa.gov/copyright.shtml" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox' 
                            name="8" value="8" 
                            checked={input.licenses[8]}
                            onChange={handleChange}
                        />  
                        <span className="checkmark"></span>
                    </label>

                    <label className="container">Public Domain Dedication (CC0)  
                        <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noreferrer">     Learn more</a>
                        <input 
                            type='checkbox' 
                            name="9" value="9" 
                            checked={input.licenses[9]}
                            onChange={handleChange}
                            />  
                        <span className="checkmark"></span>
                    </label>
              
                <label className="container">Public Domain Mark  
                    <a href="https://creativecommons.org/publicdomain/mark/1.0/" target="_blank" rel="noreferrer">     Learn more</a>
                    <input 
                        type='checkbox' 
                        name="10" value="10" 
                        checked={input.licenses[10]}
                        onChange={handleChange}
                    />  
                    <span className="checkmark"></span>
                </label>

                {/*<span class="error"><?php echo $license_error; ?></span> */}
                </div>
                <label>Minimum DPI</label>
                    <input 
                        type="number" 
                        name="dpi" 
                        value={input.dpi} 
                        onChange={handleChange}
                    />
                <button>Submit</button>
            </form>
            {submitted && < GetImages props={input} />}

        </div>)
}

export default Form;