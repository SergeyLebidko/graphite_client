import React from 'react'
import $ from 'jquery'
import {SimpleButton} from '../../common_components/SimpleButton/SimpleButton';
import {LOGOUT_ALL_DEVICES_URL} from '../../settings';
import style from './LogoutControl.module.css';

function LogoutControl(props) {

    function logout() {
        let token = localStorage.getItem('token');
        $.ajax(LOGOUT_ALL_DEVICES_URL, {
            headers: {
                'Authorization': token
            }
        }).then(() => {
            props.logoutHandler();
        });
    }

    return (
        <div className={style.logout_control_container}>
            <h3>Выход на всех устройствах</h3>
            <em>
                Если вы нажмете кнопку "Выход", то произойдет выход из аккаунта на всех устройствах, на которых вы до
                этого выполнили вход. Для использования всех возможностей сервиса вход необходимо будет выполнить
                повторно. Убедитесь, что вы помните свои учетные данные - логин и пароль.
            </em>
            <SimpleButton title="Выход" actionHandler={logout} />
        </div>
    )
}

export default LogoutControl;