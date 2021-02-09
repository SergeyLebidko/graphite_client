import React from 'react';
import {useLocation} from 'react-router-dom';
import style from './SignBlock.module.css';
import {HOST} from '../../settings';
import * as pages from '../../internal_pages';


export function SignBlock(props) {
    let location = useLocation();

    function avatarClickHandler() {
        if (location.pathname !== pages.ACCOUNT_PAGE) props.history.push(pages.ACCOUNT_PAGE);
        props.hideMenu();
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
                props.history.push(pages.REGISTER_PAGE);
                props.hideMenu();
            }}>
                регистрация
            </span>
            <span className={style.login_button} onClick={() => {
                props.history.push(pages.LOGIN_PAGE);
                props.hideMenu();
            }}>
                Вход
            </span>
        </div>
    )
}