import { React, useState, useEffect } from 'react'

import '../src/App.css'

function TenzieBox(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#61DBFB" : "white",
    }

    return(
        <>
            <div 
                onClick = {props.holdDice} 
                className = "tenzies--box" 
                style = {styles}
            >
                <h2 className = "tenzies--boxNumber">{props.value}</h2>
            </div>
        </>
    )
}

export default TenzieBox