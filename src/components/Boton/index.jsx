import React from 'react';
import './boton.css';

const Boton = ({
    color = 'blue',
    isOn = false,
    selected = (data='')=>{console.log(data)},
}) => {
    return <div 
        className={`light ${isOn?'on':'off'}`} 
        style={{background:color}} 
        onClick={() => selected(color)}>
    </div>
}

export default Boton;