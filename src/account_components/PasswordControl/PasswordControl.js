import React from 'react';
import $ from 'jquery';
import style from './PasswordControl.module.css'
import {CHANGE_PASSWORD_URL} from '../../settings';
import {createPassword, checkPassword} from '../../sign_components/RegisterForm/RegisterForm';
import {errorsCollector} from "../../sign_components/errorsCollector";

class PasswordControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPasswordFlag: false,
            showNextPasswordFlag: false,
            password: '',
            nextPassword1: '',
            nextPassword2: '',
            errors: [],
            errorsTimeout: null,
            info: null,
            infoTimeout: null
        }

        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeNextPassword1Handler = this.changeNextPassword1Handler.bind(this);
        this.changeNextPassword2Handler = this.changeNextPassword2Handler.bind(this);
        this.showPasswordHandler = this.showPasswordHandler.bind(this);
        this.showNextPasswordHandler = this.showNextPasswordHandler.bind(this);
        this.generatePasswordHandler = this.generatePasswordHandler.bind(this);
        this.changePasswordButtonHandler = this.changePasswordButtonHandler.bind(this);
    }

    resetState() {
        clearTimeout(this.state.errorsTimeout);
        clearTimeout(this.state.infoTimeout);
        this.setState({
            showPasswordFlag: false,
            showNextPasswordFlag: false,
            password: '',
            nextPassword1: '',
            nextPassword2: '',
            errors: [],
            errorsTimeout: null,
            info: null,
            infoTimeout: null
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {hasShow} = nextProps;
        if (hasShow) this.resetState();
    }

    changePasswordHandler(event) {
        this.setState({
            password: event.target.value
        });
    }

    changeNextPassword1Handler(event) {
        this.setState({
            nextPassword1: event.target.value
        });
    }

    changeNextPassword2Handler(event) {
        this.setState({
            nextPassword2: event.target.value
        });
    }

    showPasswordHandler() {
        this.setState(prevState => {
            return {
                showPasswordFlag: !prevState.showPasswordFlag
            }
        });
    }

    showNextPasswordHandler() {
        this.setState(prevState => {
            return {
                showNextPasswordFlag: !prevState.showNextPasswordFlag
            }
        });
    }

    generatePasswordHandler() {
        let nextPassword = createPassword();
        this.setState({
            showNextPasswordFlag: true,
            nextPassword1: nextPassword,
            nextPassword2: nextPassword,
        })
    }

    addError(error) {
        clearTimeout(this.state.errorsTimeout);
        this.setState(prevState => {
            return {
                errors: prevState.errors.concat(error),
                errorsTimeout: setTimeout(() => {
                    this.setState({
                        errors: []
                    })
                }, 5000)
            }
        });
    }

    changePasswordButtonHandler() {
        let {password, nextPassword1, nextPassword2} = this.state;
        if (password === '') {
            this.addError('Введите текущий пароль');
            return;
        }

        if (nextPassword1 !== nextPassword2) {
            this.addError('Новый пароль не совпадает с подтверждением');
            return;
        }

        let nextPassword = nextPassword1;
        let checkNextPasswordResults = checkPassword(nextPassword)
        if (checkNextPasswordResults.length > 0) {
            checkNextPasswordResults.forEach(value => this.addError(value));
            return;
        }

        let token = localStorage.getItem('token');
        $.ajax(CHANGE_PASSWORD_URL, {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            data: {password, next_password: nextPassword}
        }).then(() => {
            this.resetState();
            this.setState({
                info: 'Пароль успешно изменен',
                infoTimeout: setTimeout(() => {
                    this.setState({
                        info: null
                    });
                }, 3000)
            });
        }).catch(data => {
            this.resetState();
            let errors = errorsCollector(data);
            errors.forEach(value => this.addError(value));
        });
    }

    render() {
        let {errors, info} = this.state;
        let errorsBlock = null;
        if (errors.length > 0) {
            errorsBlock = (
                <div className={style.error_block}>
                    <ul>
                        {errors.map((value, index) => <li key={index}>{value}</li>)}
                    </ul>
                </div>
            )
        }

        let infoBlock = null;
        if (info !== null) {
            infoBlock = <div className={style.info_block}>{info}</div>
        }

        return (
            <div className={style.password_control_container}>
                <h3>Изменение пароля <span className={style.help_text}>(?)</span></h3>
                <p>
                    Старый пароль:
                    <div className={style.control_element}>
                        <span onClick={this.showPasswordHandler}>
                            {this.state.showPasswordFlag ? 'скрыть' : 'показать'}
                        </span>
                    </div>
                </p>
                <input type={this.state.showPasswordFlag ? 'text' : 'password'}
                       value={this.state.password}
                       onChange={this.changePasswordHandler}/>
                <p>
                    Новый пароль:
                    <div className={style.control_element}>
                        <span onClick={this.generatePasswordHandler}>создать пароль</span>
                        <span onClick={this.showNextPasswordHandler}>
                            {this.state.showNextPasswordFlag ? 'скрыть' : 'показать'}
                        </span>
                    </div>
                </p>
                <input type={this.state.showNextPasswordFlag ? 'text' : 'password'}
                       value={this.state.nextPassword1}
                       onChange={this.changeNextPassword1Handler}/>
                <p>
                    Новый пароль еще раз:
                </p>
                <input type={this.state.showNextPasswordFlag ? 'text' : 'password'}
                       value={this.state.nextPassword2}
                       onChange={this.changeNextPassword2Handler}/>
                {errorsBlock}
                {infoBlock}
                <span className={style.action_button} onClick={this.changePasswordButtonHandler}>Изменить пароль</span>
            </div>
        )
    }
}

export default PasswordControl;

