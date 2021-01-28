import React from 'react';
import style from '../styles.module.css';
import {REGISTER_ACCOUNT_URL, LOGIN_URL} from '../../settings';
import $ from 'jquery';
import {errorsCollector} from '../errorsCollector';

const upLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const lowLetters = upLetters.toLowerCase();
const digits = '0123456789';
const specLetters = '_/*-+!@#$%^&=';

const loginLetters = upLetters + lowLetters + digits + '_';
const passwordLetters = upLetters + lowLetters + digits + specLetters;

function getRandomLetters(letters, count) {
    let result = [];
    for (let index = 0; index < count; index++) {
        result.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    return result;
}

function mixArr(arr) {
    let index1;
    for (let index2 = arr.length - 1; index2 >= 0; index2--) {
        index1 = Math.floor(Math.random() * index2);
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    }
}

function createPassword() {
    let result = [];
    result = result.concat(
        getRandomLetters(upLetters, 3),
        getRandomLetters(lowLetters, 3),
        getRandomLetters(digits, 2),
        getRandomLetters(specLetters, 2)
    );
    mixArr(result);
    return result.join('');
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            login: '',
            password1: '',
            password2: '',
            showPasswordFlag: false,
            errors: []
        }
        this.registerButtonHandler = this.registerButtonHandler.bind(this);
        this.showPasswordButtonHandler = this.showPasswordButtonHandler.bind(this);
        this.createPasswordButtonHandler = this.createPasswordButtonHandler.bind(this);

        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePassword1Handler = this.changePassword1Handler.bind(this);
        this.changePassword2Handler = this.changePassword2Handler.bind(this);
        this.changeLoginHandler = this.changeLoginHandler.bind(this);
    }

    registerButtonHandler() {
        // Проверяем введенные данные
        let errors = [];
        let password;

        if (this.state.password1 !== this.state.password2) {
            errors.push('Пароль и подтверждение пароля не совпадают');
        } else {
            password = this.state.password1;
            if (password.length < 8) errors.push('Длина пароля меньше 8 символов');

            let upLettersFlag, lowLettersFlag, digitsFlag, specLettersFlag;
            upLettersFlag = lowLettersFlag = digitsFlag = specLettersFlag = false;
            for (let letter of password) {
                upLettersFlag = upLettersFlag || (upLetters.indexOf(letter) >= 0);
                lowLettersFlag = lowLettersFlag || (lowLetters.indexOf(letter) >= 0);
                digitsFlag = digitsFlag || (digits.indexOf(letter) >= 0);
                specLettersFlag = specLettersFlag || (specLetters.indexOf(letter) >= 0);
            }
            if (!upLettersFlag) errors.push('В пароле должны содержаться прописные латинские буквы');
            if (!lowLettersFlag) errors.push('В пароле должны содержаться строчные латинские буквы');
            if (!digitsFlag) errors.push('В пароле должны содержаться цифры');
            if (!specLettersFlag) errors.push('В пароле должен содержаться по крайней мере один из символов ' + specLetters);
        }

        if (this.state.login === '') errors.push('Введите логин');
        if (this.state.username === '') errors.push('Введите имя пользователя');

        if (errors.length > 0) {
            this.setState({
                errors: errors
            });
            return;
        }

        // Отправляем данные на сервер
        let account, token;

        $.ajax(REGISTER_ACCOUNT_URL, {
            method: 'POST',
            data: {
                username: this.state.username,
                login: $.trim(this.state.login),
                password: password
            }
        }).then(data => {
            account = data;
            return $.ajax(LOGIN_URL, {
                method: 'POST',
                data: {
                    login: $.trim(this.state.login),
                    password: password
                }
            });
        }).then(data => {
            token = data.token;
            this.props.accountRegisterHandler(account, token);
        }).catch(data => {
            this.setState({
                errors: errorsCollector(data)
            });
        });
    }

    showPasswordButtonHandler() {
        this.setState(prevState => {
            return {showPasswordFlag: !prevState.showPasswordFlag}
        })
    }

    createPasswordButtonHandler() {
        let password = createPassword();
        this.setState({
            showPasswordFlag: true,
            password1: password,
            password2: password
        });
    }

    changeUsernameHandler(event) {
        let value = event.target.value;
        if (value === ' ') value = '';
        this.setState({
            username: value
        });
    }

    changeLoginHandler(event) {
        let currentValue = event.target.value;
        let nextValue = '';
        for (let letter of currentValue) if (loginLetters.indexOf(letter) >= 0) nextValue += letter;
        this.setState({
            login: nextValue
        });
    }

    changePassword1Handler(event) {
        let currentValue = event.target.value;
        let nextValue = '';
        for (let letter of currentValue) if (passwordLetters.indexOf(letter) >= 0) nextValue += letter;
        this.setState({
            password1: nextValue
        });
    }

    changePassword2Handler(event) {
        let currentValue = event.target.value;
        let nextValue = '';
        for (let letter of currentValue) if (passwordLetters.indexOf(letter) >= 0) nextValue += letter;
        this.setState({
            password2: nextValue
        });
    }

    render() {
        let errorBlock = null;
        if (this.state.errors.length !== 0) {
            errorBlock = (
                <div className={style.error_block}>
                    <ul>{this.state.errors.map((value, index) => <li key={index}>{value}</li>)}</ul>
                </div>
            );
        }
        return (
            <div className={style.form_container}>
                <div className={style.sign_form}>
                    <div className={style.header_block}>
                        <h1>Добро пожаловать в Graphite</h1>
                    </div>
                    <form>
                        <div>
                            <p>Ваше имя</p>
                            <input type="text" name="username"
                                   onChange={this.changeUsernameHandler}
                                   value={this.state.username}/>
                        </div>
                        <div>
                            <p>
                                Логин для входа
                                <span className={style.login_help_text}>(?)</span>
                            </p>
                            <input type="text" name="login"
                                   onChange={this.changeLoginHandler}
                                   value={this.state.login}/>
                        </div>
                        <div>
                            <p>
                                Пароль <span className={style.password_help_text}>(?)</span>
                                <span className={style.password_control_container}>
                                    <span className={style.password_control_element}
                                          onClick={this.createPasswordButtonHandler}>
                                        создать пароль
                                    </span>
                                    <span className={style.password_control_element}
                                          onClick={this.showPasswordButtonHandler}
                                          id="showPasswordBtn">
                                        {this.state.showPasswordFlag ? 'скрыть' : 'показать'}
                                    </span>
                                </span>
                            </p>
                            <input type={this.state.showPasswordFlag ? 'text' : 'password'} name="password1"
                                   onChange={this.changePassword1Handler}
                                   value={this.state.password1}/>
                        </div>
                        <div>
                            <p>Пароль еще раз</p>
                            <input type={this.state.showPasswordFlag ? 'text' : 'password'} name="password2"
                                   onChange={this.changePassword2Handler}
                                   value={this.state.password2}/>
                        </div>
                    </form>
                    {errorBlock}
                    <span className={style.action_button} onClick={this.registerButtonHandler}>
                        Зарегистрироваться
                    </span>
                </div>
            </div>
        )
    }

}

export default RegisterForm;