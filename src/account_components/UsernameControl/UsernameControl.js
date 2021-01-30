import React from 'react';
import $ from 'jquery';
import style from '../UsernameControl/UsernameControl.module.css';
import {errorsCollector} from '../../sign_components/errorsCollector';
import additional_style from '../../sign_components/styles.module.css';
import {USERNAME_MAX_LEN, UPDATE_ACCOUNT_URL} from '../../settings';

class UsernameControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            username: this.props.account.username,
            errors: []
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
        })
    }

    usernameClickHandler() {
        this.setState({
            editMode: true
        })
    }

    okClickHandler() {
        if (this.state.username.length === 0) {
            this.setState({
                errors: ['Имя пользователя не может быть пустым']
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
                errors: errorsCollector(data)
            });
        });
    }

    cancelClickHandler() {
        this.setState({
            editMode: false,
            username: this.props.account.username,
            errors: []
        })
    }

    render() {
        let errorBlock = null;
        if (this.state.errors.length !== 0) {
            errorBlock = (
                <div className={additional_style.error_block} style={{color: 'white', padding: '3px'}}>
                    <ul>{this.state.errors.map((value, index) => <li key={index}>{value}</li>)}</ul>
                </div>
            );
        }
        return (
            <div className={style.control_container}>
                {(this.state.editMode) ?
                    <>
                        <div>
                            <input type="text" value={this.state.username} onChange={this.usernameChangeHandler}/>
                            <img src="/images/ok.svg" onClick={this.okClickHandler}/>
                            <img src="/images/cancel.svg" onClick={this.cancelClickHandler}/>
                        </div>
                        {errorBlock}
                    </>
                    :
                    <span onClick={this.usernameClickHandler}>{this.props.account.username}</span>
                }
            </div>
        )
    }
}

export default UsernameControl;