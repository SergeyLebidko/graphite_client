import React from 'react';
import $ from 'jquery';
import {useLocation} from 'react-router-dom';
import style from './SignBlock.module.css';
import {HOST} from '../../settings';


function SignBlock(props) {
    let location = useLocation();

    function avatarClickHandler() {
        if (location.pathname !== '/account') props.history.push('/account');
    }

    if (props.account !== null) {
        let avatarURL = props.account.avatar;
        return (
            <div className={style.sign_block}>
                <img src={(avatarURL == null) ? '/images/no_avatar.svg' : `${HOST}${avatarURL}`}
                     onClick={avatarClickHandler}/>
            </div>
        )
    }
    return (
        <div className={style.sign_block}>
            <span className={style.register_button} onClick={() => {
                props.history.push('/register');
                props.hideMenu();
            }}>
                регистрация
            </span>
            <span className={style.login_button} onClick={() => {
                props.history.push('/login');
                props.hideMenu();
            }}>
                Вход
            </span>
        </div>
    )
}

export default SignBlock;