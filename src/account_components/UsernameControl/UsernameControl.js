import React from 'react';
import $ from 'jquery';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';
import style from './UsernameControl.module.css';
import {USERNAME_MAX_LEN, UPDATE_ACCOUNT_URL} from '../../settings';

import {MiniButton} from '../../MiniButton/MiniButton';

class UsernameControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            username: this.props.account.username,
            errors: null
        }

        this.usernameClickHandler = this.usernameClickHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.okClickHandler = this.okClickHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
    }

    usernameChangeHandler(event) {
        let value = event.target.value;
        if (value.length > USERNAME_MAX_LEN) return;
        this.setState({
            username: value
        });
    }

    usernameClickHandler() {
        let {enableEditor} = this.props;
        if (!enableEditor) return;
        this.setState({
            editMode: true
        });
    }

    okClickHandler() {
        if (this.state.username.length === 0) {
            this.setState({
                errors: 'Имя пользователя не может быть пустым'
            });
            return;
        }

        let token = localStorage.getItem('token');
        $.ajax(UPDATE_ACCOUNT_URL, {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            data: {
                username: this.state.username
            }
        }).then((data) => {
            this.setState({
                editMode: false
            });
            this.props.refreshAccount(data);
        }).catch(data => {
            this.setState({
                errors: data
            });
        });
    }

    cancelClickHandler() {
        this.setState({
            editMode: false,
            username: this.props.account.username,
            errors: null
        })
    }

    render() {
        let {errors} = this.state;
        let {enableEditor} = this.props;
        let editorStyle = enableEditor ? {cursor: 'pointer'} : {};
        return (
            <div className={style.control_container}>
                {(this.state.editMode) ?
                    <>
                        <div>
                            <input type="text" value={this.state.username} onChange={this.usernameChangeHandler}/>
                            <MiniButton buttonType="ok" clickHandler={this.okClickHandler}/>
                            <MiniButton buttonType="cancel" clickHandler={this.cancelClickHandler}/>
                        </div>
                        <PopUpMessage msg={errors} msgType="error" endShow={() => this.setState({error: null})}/>
                    </>
                    :
                    <span onClick={this.usernameClickHandler} style={editorStyle}>
                        {this.props.account.username}
                    </span>
                }
            </div>
        )
    }
}

export default UsernameControl;