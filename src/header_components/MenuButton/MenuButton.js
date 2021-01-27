import React from 'react';
import style from './MenuButton.module.css';

function MenuButton(props) {
    let inlineStyle = {};
    if (props.hasOpenMenu) {
        inlineStyle = {
            backgroundImage: 'linear-gradient(to right bottom, limegreen, forestgreen)',
            color: 'white'
        }
    }
    return (
        <div className={style.menu_button} style={inlineStyle} onClick={props.clickHandler} id="menu_button">G</div>
    );
}

export default MenuButton;