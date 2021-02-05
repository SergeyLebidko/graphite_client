import React from 'react';
import $ from 'jquery';
import {REMOVE_ACCOUNT_URL} from '../../settings';
import style from './RemoveAccountControl.module.css';

class RemoveAccountControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.remove_account_control_container}>
                <h3>Удаление аккаунта</h3>
                <em>
                    <strong>Внимание!</strong> Удаление аккаунта - необратимая операция. Все ваши посты, лайки и
                    комментарии будут удалены. Чтобы удалить аккаунт, введите пароль и нажмите кнопку "Удалить аккаунт"
                </em>
                <p>
                    Пароль: <span className={style.show_password_btn}>показать</span>
                </p>
                <input type="text"/>
                <span className={style.action_button}>Удалить аккаунт</span>
            </div>
        )
    }
}

export default RemoveAccountControl;
