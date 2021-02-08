import React from 'react';
import style from './LoginControl.module.css'
import $ from 'jquery';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';
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
            info: null
        }

        this.changeLoginButtonHandler = this.changeLoginButtonHandler.bind(this);
        this.showPasswordHandler = this.showPasswordHandler.bind(this);
        this.loginChange = this.loginChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    resetState() {
        clearTimeout(this.state.errorTimeout);
        clearTimeout(this.state.infoTimeout);
        this.setState({
            showPasswordFlag: false,
            nextLogin: '',
            password: '',
            error: null,
            info: null,
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

    changeLoginButtonHandler() {
        let {nextLogin, password} = this.state;
        if (nextLogin.length === 0) {
            this.setState({
                error: 'Пустой логин недопустим'
            });
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
            this.setState({info: 'Логин успешно изменен'});
        }).catch(data => {
            this.resetState();
            this.setState({error: data});
        });
    }

    render() {
        let {error, info} = this.state;
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
                <PopUpMessage msg={error} msgType="error" endShow={() => this.setState({error: null})}/>
                <PopUpMessage msg={info} msgType="info" endShow={() => this.setState({info: null})}/>
                <span className={style.action_button} onClick={this.changeLoginButtonHandler}>Изменить логин</span>
            </div>
        )
    }
}

export default LoginControl;