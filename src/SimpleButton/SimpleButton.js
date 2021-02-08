import React from 'react';
import style from './SimpleButton.module.css';

export function SimpleButton(props) {
    let classString = `${style.action_button} ${style[props.stylePreset + "_button"]}`;
    return (
        <span className={classString} onClick={() => props.actionHandler()}>{props.title}</span>
    )
}

SimpleButton.defaultProps = {
    stylePreset: 'green'
}