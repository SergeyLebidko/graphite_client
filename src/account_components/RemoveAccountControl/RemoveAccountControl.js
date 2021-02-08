import React from 'react';
import $ from 'jquery';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';
import {REMOVE_ACCOUNT_URL} from '../../settings';
import style from './RemoveAccountControl.module.css';

class RemoveAccountControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPasswordFlag: false,
            password: '',
            error: null
        }

        this.showPasswordHandler = this.showPasswordHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.removeButtonHandler = this.removeButtonHandler.bind(this);
    }

    showPasswordHandler() {
        this.setState(prevState => ({showPasswordFlag: !prevState.showPasswordFlag}));
    }

    changePasswordHandler(event) {
        this.setState({
            password: event.target.value
        });
    }

    removeButtonHandler() {
        if (this.state.password.length === 0) {
            this.setState({error: 'Пароль пуст'});
            return
        }

        let token = localStorage.getItem('token');
        $.ajax(REMOVE_ACCOUNT_URL, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            },
            data: {password: this.state.password}
        }).then(() => {
            this.props.logoutHandler();
        }).catch(data => {
            this.setState({error: data});
        });
    }

    render() {
        let {error} = this.state;
        return (
            <div className={style.remove_account_control_container}>
                <h3>Удаление аккаунта</h3>
                <em>
                    <strong>Внимание!</strong> Удаление аккаунта - необратимая операция. Все ваши посты, лайки и
                    комментарии будут удалены. Чтобы удалить аккаунт, введите пароль и нажмите кнопку "Удалить аккаунт"
                </em>
                <p>
                    Пароль:
                    <span className={style.show_password_btn} onClick={this.showPasswordHandler}>
                        {this.state.showPasswordFlag ? 'скрыть' : 'показать'}
                    </span>
                </p>
                <input type={this.state.showPasswordFlag ? 'text' : 'password'}
                       value={this.state.password}
                       onChange={this.changePasswordHandler}/>
                <PopUpMessage msg={error} msgType="error" endShow={() => this.setState({error: null})}/>
                <span className={style.action_button} onClick={this.removeButtonHandler}>Удалить аккаунт</span>
            </div>
        )
    }
}

export default RemoveAccountControl;
