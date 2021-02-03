import React from 'react';
import style from './LoginControl.module.css'
import $ from 'jquery';
import {errorsCollector} from '../../sign_components/errorsCollector';
import {CHANGE_LOGIN_URL} from '../../settings';
import {loginLetters, passwordLetters} from '../../sign_components/RegisterForm/RegisterForm';

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPasswordFlag: false,
            nextLogin: '',
            password: '',
            error: null,
            errorTimeout: null,
            info: null,
            infoTimeout: null
        }

        this.changeLoginButtonHandler = this.changeLoginButtonHandler.bind(this);
        this.showPasswordHandler = this.showPasswordHandler.bind(this);
        this.loginChange = this.loginChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }

    resetState() {
        clearTimeout(this.state.errorTimeout);
        clearTimeout(this.state.infoTimeout);
        this.setState({
            showPasswordFlag: false,
            nextLogin: '',
            password: '',
            error: null,
            errorTimeout: null,
            info: null,
            infoTimeout: null
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {hasShow} = nextProps;
        if (hasShow) this.resetState()
    }

    showPasswordHandler() {
        this.setState(prevState => {
            return {
                showPasswordFlag: !prevState.showPasswordFlag
            }
        });
    }

    loginChange(event) {
        let currentValue = event.target.value;
        let nextValue = '';
        for (let letter of currentValue) if (loginLetters.indexOf(letter) >= 0) nextValue += letter;
        this.setState({
            nextLogin: nextValue
        });
    }

    passwordChange(event) {
        let currentValue = event.target.value;
        let nextValue = '';
        for (let letter of currentValue) if (passwordLetters.indexOf(letter) >= 0) nextValue += letter;
        this.setState({
            password: nextValue
        })
    }

    setMessage(msg, msgType) {
        if (msgType === 'error') {
            clearInterval(this.state.errorTimeout);
            this.setState({
                error: msg,
                errorTimeout: setTimeout(() => {
                    this.setState({
                        error: null
                    })
                }, 3000)
            });
            return;
        }

        if (msgType === 'info') {
            clearInterval(this.state.infoTimeout);
            this.setState({
                info: msg,
                infoTimeout: setTimeout(() => {
                    this.setState({
                        info: null
                    })
                }, 3000)
            });
        }
    }

    changeLoginButtonHandler() {
        let {nextLogin, password} = this.state;
        if (nextLogin.length === 0) {
            this.setMessage('Пустой логин недопустим', 'error');
            return;
        }

        let token = localStorage.getItem('token');
        $.ajax(CHANGE_LOGIN_URL, {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            data: {
                login: nextLogin,
                password: password
            }
        }).then(() => {
            this.resetState();
            this.setMessage('Логин успешно изменен', 'info');
        }).catch(data => {
            this.resetState();
            this.setMessage(errorsCollector(data), 'error');
        });

    }

    render() {
        let errorBlock = null;
        if (this.state.error !== null) {
            errorBlock = <div className={style.error_block}>{this.state.error}</div>
        }
        let infoBlock = null;
        if (this.state.info !== null) {
            infoBlock = <div className={style.info_block}>{this.state.info}</div>
        }
        return (
            <div className={style.login_control_container}>
                <h3>Изменение логина <span className={style.help_text}>(?)</span></h3>
                <p>
                    Новый логин:
                </p>
                <input type="text" value={this.state.nextLogin} onChange={this.loginChange}/>
                <p>
                    Текущий пароль:
                    <span className={style.show_password_btn} onClick={this.showPasswordHandler}>
                        {this.state.showPasswordFlag ? 'скрыть' : 'показать'}
                    </span>
                </p>
                <input type={this.state.showPasswordFlag ? 'text' : 'password'} value={this.state.password}
                       onChange={this.passwordChange}/>
                {errorBlock}
                {infoBlock}
                <span className={style.action_button} onClick={this.changeLoginButtonHandler}>Изменить логин</span>
            </div>
        )
    }
}

export default LoginControl;