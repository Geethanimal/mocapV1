// importing dependencies
import React from "react";

// importing 3rd party dependencies
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

// importing styles
import './tryMocapV1.css'

// importing components
import HPE from "../../components/human-pose-estimation/human-pose-estimation";

// creating a function for tryMocapV1
const TryMocapV1 = () => {

    return (
        <>
        <HPE/>
        </>

    )
}

export default TryMocapV1