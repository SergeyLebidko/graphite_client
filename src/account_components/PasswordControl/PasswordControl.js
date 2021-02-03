import React from 'react';
import style from './PasswordControl.module.css'
import {createPassword} from '../../sign_components/RegisterForm/RegisterForm';

class PasswordControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPasswordFlag: false,
            showNextPasswordFlag: false,
            password: '',
            nextPassword1: '',
            nextPassword2: '',
            errors: null,
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
            errors: null,
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

    changePasswordButtonHandler() {
        // TODO Вставить код проверки данных и отправки их на сервер
    }

    render() {
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
                        <span onClick={this.generatePasswordHandler}>сгенерировать</span>
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
                <span className={style.action_button} onClick={this.changePasswordButtonHandler}>Изменить пароль</span>
            </div>
        )
    }
}

export default PasswordControl;

