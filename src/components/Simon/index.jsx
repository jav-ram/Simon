import React from 'react';
import './simon.css';

import Boton from '../Boton';

const Simon = ({
    colors = ['green', 'red', 'yellow', 'blue'],
    isOn = '',
    selected = (data='')=>{console.log("Simon")},
}) => {
    return <div className="Simon">
        {colors.map( color => <Boton key={color} color={color} isOn={color===isOn} selected={selected}/>)}
    </div>
}

export default Simon;