import React from 'react'
import style from './MiniButton.module.css'

export const MiniButton = props => {
    let content;
    let filePath = `/images/${props.buttonType}.svg`;
    switch (props.buttonType) {
        case 'ok': {
            content = <img className={style.ok_mini_button} src={filePath} onClick={props.clickHandler}/>;
            break;
        }
        case 'cancel': {
            content = <img className={style.cancel_mini_button} src={filePath} onClick={props.clickHandler}/>;
            break;
        }
    }
    return <div className={style.mini_button_container}>{content}</div>;
}
