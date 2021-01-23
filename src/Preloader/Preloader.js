import React from 'react';
import style from './Preloader.module.css';

function Preloader() {
    let pulsars = [];
    for (let delay = 0, key = 0; delay <= 800; delay += 100, key++) {
        pulsars.push(<div key={key} className={style.pulsar} style={{animationDelay: `${delay}ms`}}></div>);
    }
    return (
        <div className={style.preloader} id="preloader">
            {pulsars}
        </div>
    )
}

export default Preloader
