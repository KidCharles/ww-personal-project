import React from 'react';

export default function Trip(props){
    return(
        <div >
            {/* <button id='DeleteButton' onClick={() => {props.deleteHouse(props.id)}} >X</button> */}
            <p>{props.trip_name}</p>
        </div> 
    )
}

//mapstatetoProps
//trip name