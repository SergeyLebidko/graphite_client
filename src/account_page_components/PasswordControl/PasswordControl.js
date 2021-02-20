import React from 'react';
import $ from 'jquery';
import PopUpMessage from '../../common_components/PopUpMessage/PopUpMessage';
import {SimpleButton} from '../../common_components/SimpleButton/SimpleButton';
import style from './PasswordControl.module.css'
import {CHANGE_PASSWORD_URL} from '../../settings';
import {createPassword, checkPassword} from '../../sign_components/RegisterForm/RegisterForm';

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
            info: null
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
        this.setState({
            showPasswordFlag: false,
            showNextPasswordFlag: false,
            password: '',
            nextPassword1: '',
            nextPassword2: '',
            errors: [],
            info: null
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
        this.setState(prevState => ({showPasswordFlag: !prevState.showPasswordFlag}));
    }

    showNextPasswordHandler() {
        this.setState(prevState => ({showNextPasswordFlag: !prevState.showNextPasswordFlag}));
    }

    generatePasswordHandler() {
        let nextPassword = createPassword();
        this.setState({
            showNextPasswordFlag: true,
            nextPassword1: nextPassword,
            nextPassword2: nextPassword,
        })
    }

    changePasswordButtonHandler() {
        let {password, nextPassword1, nextPassword2} = this.state;
        if (password === '') {
            this.setState({errors: 'Введите текущий пароль'});
            return;
        }

        if (nextPassword1 !== nextPassword2) {
            this.setState({errors: 'Новый пароль не совпадает с подтверждением'});
            return;
        }

        let nextPassword = nextPassword1;
        let checkNextPasswordResults = checkPassword(nextPassword);
        if (checkNextPasswordResults.length > 0) {
            this.setState({
                errors: checkNextPasswordResults
            });
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
            this.setState({info: 'Пароль успешно изменен'});
        }).catch(data => {
            this.resetState();
            this.setState({errors: data});
        });
    }

    render() {
        let {errors, info} = this.state;
        return (
            <div className={style.password_control_container}>
                <h3>Изменение пароля <span className={style.help_text}>(?)</span></h3>
                <div>
                    Старый пароль:
                    <div className={style.control_element}>
                        <span onClick={this.showPasswordHandler}>
                            {this.state.showPasswordFlag ? 'скрыть' : 'показать'}
                        </span>
                    </div>
                </div>
                <input type={this.state.showPasswordFlag ? 'text' : 'password'}
                       value={this.state.password}
                       onChange={this.changePasswordHandler}/>
                <div>
                    Новый пароль:
                    <div className={style.control_element}>
                        <span onClick={this.generatePasswordHandler}>создать пароль</span>
                        <span onClick={this.showNextPasswordHandler}>
                            {this.state.showNextPasswordFlag ? 'скрыть' : 'показать'}
                        </span>
                    </div>
                </div>
                <input type={this.state.showNextPasswordFlag ? 'text' : 'password'}
                       value={this.state.nextPassword1}
                       onChange={this.changeNextPassword1Handler}/>
                <div>
                    Новый пароль еще раз:
                </div>
                <input type={this.state.showNextPasswordFlag ? 'text' : 'password'}
                       value={this.state.nextPassword2}
                       onChange={this.changeNextPassword2Handler}/>
                <PopUpMessage msg={errors} msgType="error" endShow={() => this.setState({errors: []})}/>
                <PopUpMessage msg={info} msgType="info" endShow={() => this.setState({info: null})}/>
                <SimpleButton title="Изменить пароль" actionHandler={this.changePasswordButtonHandler} />
            </div>
        )
    }
}

export default PasswordControl;

