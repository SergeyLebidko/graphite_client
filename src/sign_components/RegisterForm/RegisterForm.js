import React from 'react';
import style from '../styles.module.css';
import $ from 'jquery';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';
import {SimpleButton} from '../../SimpleButton/SimpleButton';
import {REGISTER_ACCOUNT_URL, LOGIN_URL, USERNAME_MAX_LEN} from '../../settings';

const upLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const lowLetters = upLetters.toLowerCase();
const digits = '0123456789';
const specLetters = '_/*-+!@#$%^&=';

export const loginLetters = upLetters + lowLetters + digits + '_';
export const passwordLetters = upLetters + lowLetters + digits + specLetters;

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

export function createPassword() {
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

export function checkPassword(password) {
    let errors = [];

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

    return errors;
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
            errors = errors.concat(checkPassword(password));
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
                errors: data
            });
        });
    }

    showPasswordButtonHandler() {
        this.setState(prevState => ({showPasswordFlag: !prevState.showPasswordFlag}));
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
        if (value.length > USERNAME_MAX_LEN) value = this.state.value;
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

    getNextPasswordValue(event) {
        let currentValue = event.target.value;
        let nextValue = '';
        for (let letter of currentValue) if (passwordLetters.indexOf(letter) >= 0) nextValue += letter;
        return nextValue;
    }

    changePassword1Handler(event) {
        this.setState({
            password1: this.getNextPasswordValue(event)
        });
    }

    changePassword2Handler(event) {
        this.setState({
            password2: this.getNextPasswordValue(event)
        });
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
                    <PopUpMessage msg={errors} msgType="error" endShow={() => this.setState({errors: []})}/>
                    <SimpleButton title="Зарегистрироваться" actionHandler={this.registerButtonHandler} />
                </div>
            </div>
        )
    }

}

export default RegisterForm;