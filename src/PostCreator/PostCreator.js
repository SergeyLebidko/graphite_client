import React from 'react';
import $ from 'jquery';
import {SimpleButton} from '../SimpleButton/SimpleButton';
import PopUpMessage from '../PopUpMessage/PopUpMessage';
import {withRouter} from 'react-router-dom';
import style from './PostCreator.module.css';
import {POST_URL, POST_TITLE_MAX_LEN, POST_TEXT_MAX_LEN} from '../settings';
import * as pages from '../internal_pages';

class PostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleValue: '',
            textValue: '',
            errors: null
        }

        this.headerChangeHandler = this.headerChangeHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.clearClickHandler = this.clearClickHandler.bind(this);
        this.saveClickHandler = this.saveClickHandler.bind(this);
    }

    headerChangeHandler(event) {
        let nextValue = event.target.value;
        if (nextValue.length > POST_TITLE_MAX_LEN) nextValue = nextValue.slice(0, POST_TITLE_MAX_LEN);
        this.setState({titleValue: nextValue})
    }

    textChangeHandler(event) {
        let nextValue = event.target.value;
        if (nextValue.length > POST_TEXT_MAX_LEN) nextValue = nextValue.slice(0, POST_TEXT_MAX_LEN);
        this.setState({textValue: nextValue});
    }

    clearClickHandler() {
        this.setState({
            titleValue: '',
            textValue: ''
        });
    }

    saveClickHandler() {
        let errors = [];
        let {titleValue, textValue} = this.state;
        titleValue = $.trim(titleValue);
        textValue = $.trim(textValue);
        if (titleValue.length === 0) errors.push('Загловок не должен быть пустым');
        if (textValue.length === 0) errors.push('Текст поста не должен быть пустым');
        if (errors.length > 0) {
            this.setState({errors: errors});
            return;
        }

        let token = localStorage.getItem('token');
        $.ajax(POST_URL, {
            method: 'POST',
            headers: {'Authorization': token},
            data: {
                title: this.state.titleValue,
                text: this.state.textValue,
                account: this.props.account.id
            }
        }).then(() => {
            this.props.history.push(pages.MY_POSTS_PAGE);
        })
    }

    render() {
        let {titleValue, textValue, errors} = this.state;
        let wordCount = 0;
        let matches = textValue.match(/([А-Яа-яA-Za-zЁё]+)/g);
        if (matches !== null) wordCount = matches.length;

        return (
            <div className={style.post_container}>
                <div className={style.title}>
                    <p>
                        Заголовок (осталось {POST_TITLE_MAX_LEN - titleValue.length}):
                    </p>
                    <input type="text" value={titleValue} onChange={this.headerChangeHandler}/>
                </div>
                <PopUpMessage msg={errors} msgType="error" endShow={() => this.setState({errors: null})}/>
                <div className={style.text}>
                    <p>
                        Осталось: {POST_TEXT_MAX_LEN - textValue.length}
                    </p>
                    <textarea rows="30" value={textValue} onChange={this.textChangeHandler}/>
                </div>
                <p>
                    Всего слов: {wordCount}
                </p>
                <div className={style.control_block}>
                    <SimpleButton title="Очистить" actionHandler={this.clearClickHandler} stylePreset="blue"/>
                    <SimpleButton title="Сохранить" actionHandler={this.saveClickHandler}/>
                </div>
            </div>
        )
    }
}

export default withRouter(PostCreator);