import React from 'react';

const BackButton = ({onClick}) => (
    <div onClick={onClick} className="leftAlign"><i id="homeButton" className="fa fa-arrow-left fa-2x"></i></div>
)

export default BackButton;