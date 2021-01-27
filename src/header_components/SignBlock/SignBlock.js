import React from 'react';
import style from './SignBlock.module.css';


function SignBlock(props) {
    if (props.account !== null) {
        let avatarURL = props.account.avatar;
        return (
            <div className={style.sign_block}>
                <img src={(avatarURL == null) ? '/images/no_avatar.svg' : avatarURL}/>
            </div>
        )
    }
    return (
        <div className={style.sign_block}>
            <span className={style.register_button} onClick={() => {
                props.history.push('/register')
            }}>
                регистрация
            </span>
            <span className={style.login_button} onClick={() => {
                props.history.push('/login')
            }}>
                Вход
            </span>
        </div>
    )
}

export default SignBlock;