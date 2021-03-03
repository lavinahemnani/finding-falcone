/**
 * Author: Lavina Hemnani
 * Description: This functional component is used to show result of finding falcone search
 */

import React from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * This functional component is used to show result of finding falcone search
 * @param {*} props 
 */
const Result = (props) =>{
    var searchStatus;
    var totalTimeTaken;
    if(props.location.state){
        searchStatus=props.location.state.status;
        totalTimeTaken = props.location.state.totalTimeTaken;
    }
    return (
        <div>
            {props.location.state?
                (searchStatus==="success"? 
                    (<div>
                    <h2 style={{ color: "black" }} align="center">
                        Success! Congratulations on Finding Falcone! King Shan is
                        mighty pleased!
                    </h2>
                    <h4 style={{ color: "black" }} align="center">
                    Time Taken : {totalTimeTaken}
                    </h4>
                    <h3 style={{ color: "black" }} align="center">
                        Planet found : {props.location.state.planet_name}
                    </h3>
                    <h2 style={{ color: "black" }} align="center">
                        <Link to="/">Try another search</Link>
                    </h2>
                    </div>)
                    :
                    (<div><h2 style={{ color: "black" }} align="center">
                        Failure! Unable to locate Falcone!
                    </h2>
                    <h2 style={{ color: "black" }} align="center">
                        <Link to="/">Try searching by returing to Home Page!</Link>
                    </h2></div>)
                ):(<div>
                    <h2 style={{ color: "black" }} align="center">
                       Return to Home page to find falcone!
                    </h2>
                    <h2 style={{ color: "black" }} align="center">
                        <Link to="/">Try searching by returing to Home Page!</Link>
                    </h2></div>
                )
            }
        </div>
    )
}

Result.propTypes = {
    location: PropTypes.string.isRequired
}

/** export the component class */
export default Result;