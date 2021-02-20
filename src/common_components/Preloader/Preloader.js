import React from 'react';
import style from './Preloader.module.css';


function Preloader(props) {
    let pulsars = [];
    for (let delay = 0, key = 0; delay <= 800; delay += 100, key++) {
        pulsars.push(<div key={key} className={style.pulsar} style={{animationDelay: `${delay}ms`}}></div>);
    }

    let targetClass = `${style.preloader} ${props.modal ? style.modal : ""}`;
    return (
        <div className={targetClass} id="preloader">
            {pulsars}
        </div>
    )
}

Preloader.defaultProps = {
    modal: true
}

export default Preloader
