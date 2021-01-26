import React from 'react';
import style from './LoginForm.module.css';


class LoginForm extends React.Component {
    render() {
        let errorBlock = null;
        return (
            <div className={style.form_container}>
                <div className={style.register_form}>
                    <div className={style.header_block}>
                        <h1>Добро пожаловать в Graphite</h1>
                    </div>
                    <form>
                        <div>
                            <p>
                                Логин для входа
                            </p>
                            <input type="text" name="login"/>
                        </div>
                        <div>
                            <p>
                                Пароль
                                <span>показать/скрыть</span>
                            </p>
                            <input type="text" name="password"/>
                        </div>
                    </form>
                    {errorBlock}
                    <span>Войти</span>
                </div>
            </div>
        )
    }
}

export default LoginForm;