import React from 'react';
import style from './LoginControl.module.css'

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Изменение логина <span className={style.help_text}>(?)</span></h3>
            </div>
        )
    }
}

export default LoginControl;