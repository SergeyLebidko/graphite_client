import React from 'react';
import style from '../styles.module.css';
import $ from 'jquery';
import {LOGIN_URL, CHECK_ACCOUNT_URL} from '../../settings';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            showPasswordFlag: false,
            errors: []
        }

        this.loginButtonHandler = this.loginButtonHandler.bind(this);
        this.loginChange = this.loginChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.showPasswordHandler = this.showPasswordHandler.bind(this);
    }

    loginButtonHandler() {
        let {login, password} = this.state;
        let errors = [];
        if (login === '') errors.push('Логин пуст');
        if (password === '') errors.push('Пароль пуст');
        if (errors.length > 0) {
            this.setState({
                errors: errors
            });
            return;
        }

        let token;
        $.ajax(LOGIN_URL, {
            method: 'POST',
            data: {
                login: this.state.login,
                password: this.state.password
            }
        }).then(data => {
            token = data.token;
            return $.ajax(CHECK_ACCOUNT_URL, {
                headers: {
                    'Authorization': token
                }
            });
        }).then(account => {
            this.props.accountLoginHandler(account, token);
        }).catch(data => {
            this.setState({
                errors: data
            });
        });
    }

    loginChange(event) {
        this.setState({
            login: event.target.value
        });
    }

    passwordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    showPasswordHandler() {
        this.setState(prevState => ({showPasswordFlag: !prevState.showPasswordFlag}));
    }

    render() {
        let {errors} = this.state;
        return (
            <div className={style.form_container}>
                <div className={style.sign_form}>
                    <div className={style.header_block}>
                        <h1>Добро пожаловать в Graphite</h1>
                    </div>
                    <form>
                        <div>
                            <p>Логин для входа</p>
                            <input type="text" name="login" value={this.state.login} onChange={this.loginChange}/>
                        </div>
                        <div>
                            <p>
                                Пароль
                                <span className={style.password_control_container}>
                                    <span className={style.password_control_element} onClick={this.showPasswordHandler}>
                                        {this.state.showPasswordFlag ? 'скрыть' : 'показать'}
                                    </span>
                                </span>
                            </p>
                            <input type={this.state.showPasswordFlag ? 'text' : 'password'} name="password"
                                   value={this.state.password}
                                   onChange={this.passwordChange}/>
                        </div>
                    </form>
                    <PopUpMessage msg={errors} msgType="error" endShow={() => this.setState({errors: []})}/>
                    <span className={style.action_button} onClick={this.loginButtonHandler}>Войти</span>
                </div>
            </div>
        )
    }
}

export default LoginForm;