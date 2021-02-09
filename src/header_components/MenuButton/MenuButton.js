import React from 'react';
import style from './MenuButton.module.css';


function MenuButton(props) {
    let targetClasses = `${style.menu_button} ${props.hasOpenMenu ? style.opened_menu : style.closed_menu}`;
    return (
        <div className={targetClasses} onClick={props.clickHandler} id="menu_button">G</div>
    );
}

export default MenuButton;