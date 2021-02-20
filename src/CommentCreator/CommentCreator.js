import React from 'react';
import $ from 'jquery';
import style from './CommentCreator.module.css';
import {SimpleButton} from '../common_components/SimpleButton/SimpleButton';
import {COMMENTS_URL, COMMENT_MAX_LEN} from '../settings';

class CommentCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.enterPressHandler = this.enterPressHandler.bind(this);
    }

    setNextText(nextText) {
        let _nextText = nextText.length > COMMENT_MAX_LEN ? nextText.slice(0, COMMENT_MAX_LEN) : nextText;
        this.setState({
            text: _nextText
        });
    }

    changeTextHandler(event) {
        this.setNextText(event.target.value);
    }

    enterPressHandler(event) {
        let {keyCode, shiftKey} = event;
        if (keyCode === 13 && !shiftKey) this.sendComment();
        if (keyCode === 13 && shiftKey) {
            let {text} = this.state;
            this.setNextText(text + '\n');
        }
    }

    sendComment() {
        let {text} = this.state;
        text = $.trim(text);
        if (!text) return;

        let {account, postId} = this.props;
        let token = localStorage.getItem('token');
        $.ajax(COMMENTS_URL, {
            method: 'post',
            headers: {'Authorization': token},
            data: {
                account: account.id,
                post: postId,
                text: text
            }
        }).then(data => {
            // TODO Вставить код очистки поля ввода и передачи данных вышестоящему компоненту
            console.log(data);
        })
    }


    render() {
        let {text} = this.state;
        return (
            <div className={style.creator_container}>
                <div>
                    <span>Осталось: {COMMENT_MAX_LEN - text.length}</span>
                </div>
                <textarea rows={4} value={text} onChange={this.changeTextHandler} onKeyDown={this.enterPressHandler}/>
                <SimpleButton title="Отправить" stylePreset="green" actionHandler={() => this.sendComment()}/>
            </div>
        )
    }
}

export default CommentCreator;