import React from 'react'
import style from './MiniButton.module.css'

export const MiniButton = props => {
    let filePath = `/images/${props.buttonType}.svg`;
    let content = <img src={filePath} onClick={props.clickHandler}/>;
    let targetClasses = `${style.mini_button_container} ${style[props.buttonType]}`;
    return <div className={targetClasses}>{content}</div>;
}
