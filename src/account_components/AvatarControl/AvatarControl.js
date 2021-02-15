import React from 'react';
import $ from 'jquery';
import style from './AvatarControl.module.css';
import PopUpMessage from '../../PopUpMessage/PopUpMessage';
import {UPDATE_ACCOUNT_URL, HOST} from '../../settings';

class AvatarControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }

        this.fileChoiceHandler = this.fileChoiceHandler.bind(this);
        this.avatarClickHandler = this.avatarClickHandler.bind(this);
    }

    avatarClickHandler() {
        let {enableEditor} = this.props;
        if (!enableEditor) return;
        $('#avatar_chooser').trigger('click');
    }

    fileChoiceHandler(event) {
        let filePath = event.target.value;
        if (!/(.jpg|.JPG|.jpeg|.JPEG)$/.test(filePath)) {
            this.setState({error: 'Допустимы изображения только в формате jpg'});
            return;
        }

        this.setState({error: null});

        let token = localStorage.getItem('token');
        let formData = new FormData();
        formData.append("avatar", event.target.files[0]);
        $.ajax(UPDATE_ACCOUNT_URL, {
            method: "PATCH",
            headers: {
                'Authorization': token
            },
            data: formData,
            processData: false,
            contentType: false
        }).then(data => {
            this.props.refreshAccount(data);
            this.setState({
                avatar: data.avatar
            })
        });
    }

    render() {
        let {error} = this.state;
        let {avatar} = this.props.account;
        let {enableEditor} = this.props;
        let editorStyle = enableEditor ? {cursor: 'pointer'} : {}

        let avatarURL;
        if (avatar === null){
            avatarURL = '/images/no_avatar.svg';
        } else {
            avatarURL = avatar[0] === '/' ? HOST + avatar : avatar;
        }

        return (
            <div className={style.avatar_container}>
                <img src={avatarURL}
                     onClick={this.avatarClickHandler}
                     style={editorStyle}/>
                <PopUpMessage msg={error} msgType="error" endShow={() => this.setState({error: null})}/>
                <input type="file" style={{display: 'none'}} onChange={this.fileChoiceHandler} id="avatar_chooser"/>
            </div>
        );
    }
}

export default AvatarControl;