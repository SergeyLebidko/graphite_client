import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import style from './PostCreator.module.css';
import {CREATE_POST_URL} from '../settings';

import PopUpMessage from '../PopUpMessage/PopUpMessage';

class PostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerValue: '',
            textValue: ''
        }

        this.headerChangeHandler = this.headerChangeHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.saveClickHandler = this.saveClickHandler.bind(this);
    }

    headerChangeHandler(event) {
        this.setState({headerValue: event.target.value})
    }

    textChangeHandler(event) {
        this.setState({textValue: event.target.value});
    }

    cancelClickHandler() {
        this.setState({
            headerValue: '',
            textValue: ''
        });
        this.props.history.push('/content');
    }

    saveClickHandler() {
        let token = localStorage.getItem('token');
        $.ajax(CREATE_POST_URL, {
            method: 'POST',
            headers: {'Authorization': token},
            data: {
                title: this.state.headerValue,
                text: this.state.textValue,
                account: this.props.account.id
            }
        }).then(() => {
            console.log('Пост успешно сохранен');
        })
    }

    render() {
        let {headerValue, textValue} = this.state;
        return (
            <div className={style.post_container}>
                <div className={style.title}>
                    <p>Заголовок:</p>
                    <input type="text" value={headerValue} onChange={this.headerChangeHandler}/>
                </div>
                <div className={style.text}>
                    <textarea rows="20" value={textValue} onChange={this.textChangeHandler}/>
                </div>
                <div className={style.control_block}>
                    <span className={style.cancel_button} onClick={this.cancelClickHandler}>Отмена</span>
                    <span className={style.save_button} onClick={this.saveClickHandler}>Сохранить</span>
                </div>
            </div>
        )
    }
}

export default withRouter(PostCreator);